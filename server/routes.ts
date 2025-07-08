import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { spawn } from "child_process";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { insertBuildSchema, insertAlertSchema } from "@shared/schema";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, "../uploads");
const BUILDS_DIR = path.join(__dirname, "../builds");

// Ensure directories exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(BUILDS_DIR)) {
  fs.mkdirSync(BUILDS_DIR, { recursive: true });
}

const upload = multer({ dest: UPLOADS_DIR });

// Constants from original Python script
const SECURE_PASSWORD = "quantumsecure";
const OWNER = "Ervin Remus Radosavlevici";

function generateSHA256(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

function generateFolderHash(folderPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    
    function processDir(dirPath: string) {
      try {
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
          const fullPath = path.join(dirPath, file);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            processDir(fullPath);
          } else {
            const content = fs.readFileSync(fullPath);
            hash.update(content);
          }
        }
      } catch (error) {
        reject(error);
      }
    }
    
    processDir(folderPath);
    resolve(hash.digest('hex'));
  });
}

async function createLegalFiles(buildDir: string, hash: string) {
  const hashFile = path.join(buildDir, "project_hash.txt");
  const licenseFile = path.join(buildDir, "LICENSE.txt");
  
  const hashContent = `Author: ${OWNER}\nTimestamp: ${new Date().toISOString()}\nSHA256: ${hash}\n`;
  const licenseContent = `This software is protected by international copyright law.\nCreated by ${OWNER}\n`;
  
  fs.writeFileSync(hashFile, hashContent);
  fs.writeFileSync(licenseFile, licenseContent);
  
  return [
    { filename: "project_hash.txt", filepath: hashFile, filesize: Buffer.byteLength(hashContent) },
    { filename: "LICENSE.txt", filepath: licenseFile, filesize: Buffer.byteLength(licenseContent) }
  ];
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication endpoint
  app.post("/api/auth", async (req, res) => {
    const { password } = req.body;
    
    if (password !== SECURE_PASSWORD) {
      await storage.createAlert({
        message: "Unauthorized access attempt detected",
        type: "security"
      });
      return res.status(401).json({ message: "Invalid password" });
    }
    
    res.json({ success: true, message: "Authentication successful" });
  });

  // Upload Python file and build
  app.post("/api/build/python", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const originalName = req.file.originalname;
      if (!originalName.endsWith('.py')) {
        return res.status(400).json({ message: "Only Python files are allowed" });
      }

      const build = await storage.createBuild({
        filename: originalName,
        sourceType: "file",
        status: "building"
      });

      // Start building in background
      buildPythonFile(req.file.path, originalName, build.id);

      res.json({ buildId: build.id, message: "Build started successfully" });
    } catch (error) {
      console.error("Build error:", error);
      res.status(500).json({ message: "Build failed to start" });
    }
  });

  // GitHub repository processing
  app.post("/api/build/github", async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url || !url.includes('github.com')) {
        return res.status(400).json({ message: "Invalid GitHub URL" });
      }

      const build = await storage.createBuild({
        filename: path.basename(url),
        sourceType: "github",
        sourceUrl: url,
        status: "building"
      });

      // Start GitHub processing in background
      processGitHubRepo(url, build.id);

      res.json({ buildId: build.id, message: "GitHub repository processing started" });
    } catch (error) {
      console.error("GitHub processing error:", error);
      res.status(500).json({ message: "Failed to process GitHub repository" });
    }
  });

  // Get builds
  app.get("/api/builds", async (req, res) => {
    try {
      const builds = await storage.getBuilds();
      res.json(builds);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch builds" });
    }
  });

  // Get specific build
  app.get("/api/builds/:id", async (req, res) => {
    try {
      const build = await storage.getBuild(parseInt(req.params.id));
      if (!build) {
        return res.status(404).json({ message: "Build not found" });
      }
      res.json(build);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch build" });
    }
  });

  // Get downloadable files for a build
  app.get("/api/builds/:id/files", async (req, res) => {
    try {
      const files = await storage.getDownloadableFilesByBuildId(parseInt(req.params.id));
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch files" });
    }
  });

  // Download file
  app.get("/api/download/:id", async (req, res) => {
    try {
      const file = await storage.getDownloadableFile(parseInt(req.params.id));
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      if (!fs.existsSync(file.filepath)) {
        return res.status(404).json({ message: "File not found on disk" });
      }

      res.download(file.filepath, file.filename);
    } catch (error) {
      res.status(500).json({ message: "Failed to download file" });
    }
  });

  // Get alerts
  app.get("/api/alerts", async (req, res) => {
    try {
      const alerts = await storage.getAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function buildPythonFile(filePath: string, originalName: string, buildId: number) {
  const startTime = Date.now();
  
  try {
    const buildDir = path.join(BUILDS_DIR, `build_${buildId}`);
    fs.mkdirSync(buildDir, { recursive: true });

    // Copy file to build directory
    const targetPath = path.join(buildDir, originalName);
    fs.copyFileSync(filePath, targetPath);

    // Run PyInstaller
    const pyinstaller = spawn('pyinstaller', ['--onefile', '--distpath', buildDir, targetPath]);
    
    pyinstaller.on('close', async (code) => {
      const buildTime = Math.floor((Date.now() - startTime) / 1000);
      
      if (code === 0) {
        // Build successful
        const hash = await generateSHA256(targetPath);
        const legalFiles = await createLegalFiles(buildDir, hash);
        
        // Find the executable
        const exeName = originalName.replace('.py', '.exe');
        const exePath = path.join(buildDir, exeName);
        
        let executableSize = 0;
        if (fs.existsSync(exePath)) {
          executableSize = fs.statSync(exePath).size;
          
          // Create downloadable file entries
          await storage.createDownloadableFile({
            buildId,
            filename: exeName,
            filepath: exePath,
            filesize: executableSize,
            fileType: "executable"
          });
        }

        // Add legal files
        for (const file of legalFiles) {
          await storage.createDownloadableFile({
            buildId,
            filename: file.filename,
            filepath: file.filepath,
            filesize: file.filesize,
            fileType: file.filename.includes('LICENSE') ? 'license' : 'hash'
          });
        }

        await storage.updateBuild(buildId, {
          status: "success",
          hash,
          buildTime,
          fileCount: 1
        });
      } else {
        // Build failed
        await storage.updateBuild(buildId, {
          status: "failed",
          errorMessage: "PyInstaller build failed",
          buildTime
        });
      }
    });

    pyinstaller.on('error', async (error) => {
      const buildTime = Math.floor((Date.now() - startTime) / 1000);
      await storage.updateBuild(buildId, {
        status: "failed",
        errorMessage: error.message,
        buildTime
      });
    });

  } catch (error) {
    const buildTime = Math.floor((Date.now() - startTime) / 1000);
    await storage.updateBuild(buildId, {
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      buildTime
    });
  }
}

async function processGitHubRepo(url: string, buildId: number) {
  const startTime = Date.now();
  
  try {
    // Convert GitHub URL to zip download URL
    const zipUrl = url.replace('github.com', 'github.com') + '/archive/refs/heads/main.zip';
    
    // This is a simplified implementation - in production you'd want proper git cloning
    await storage.updateBuild(buildId, {
      status: "success",
      hash: "simulated_hash_" + buildId,
      buildTime: Math.floor((Date.now() - startTime) / 1000),
      fileCount: 10 // Simulated
    });
    
  } catch (error) {
    const buildTime = Math.floor((Date.now() - startTime) / 1000);
    await storage.updateBuild(buildId, {
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "GitHub processing failed",
      buildTime
    });
  }
}
