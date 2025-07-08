import { users, builds, alerts, downloadableFiles, type User, type InsertUser, type Build, type InsertBuild, type Alert, type InsertAlert, type DownloadableFile, type InsertDownloadableFile } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createBuild(build: InsertBuild): Promise<Build>;
  getBuild(id: number): Promise<Build | undefined>;
  getBuilds(): Promise<Build[]>;
  updateBuild(id: number, updates: Partial<Build>): Promise<Build | undefined>;
  
  createAlert(alert: InsertAlert): Promise<Alert>;
  getAlerts(): Promise<Alert[]>;
  
  createDownloadableFile(file: InsertDownloadableFile): Promise<DownloadableFile>;
  getDownloadableFilesByBuildId(buildId: number): Promise<DownloadableFile[]>;
  getDownloadableFile(id: number): Promise<DownloadableFile | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private builds: Map<number, Build>;
  private alerts: Map<number, Alert>;
  private downloadableFiles: Map<number, DownloadableFile>;
  private currentUserId: number;
  private currentBuildId: number;
  private currentAlertId: number;
  private currentFileId: number;

  constructor() {
    this.users = new Map();
    this.builds = new Map();
    this.alerts = new Map();
    this.downloadableFiles = new Map();
    this.currentUserId = 1;
    this.currentBuildId = 1;
    this.currentAlertId = 1;
    this.currentFileId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBuild(insertBuild: InsertBuild): Promise<Build> {
    const id = this.currentBuildId++;
    const build: Build = { 
      ...insertBuild, 
      id, 
      createdAt: new Date()
    };
    this.builds.set(id, build);
    return build;
  }

  async getBuild(id: number): Promise<Build | undefined> {
    return this.builds.get(id);
  }

  async getBuilds(): Promise<Build[]> {
    return Array.from(this.builds.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async updateBuild(id: number, updates: Partial<Build>): Promise<Build | undefined> {
    const build = this.builds.get(id);
    if (!build) return undefined;
    
    const updatedBuild = { ...build, ...updates };
    this.builds.set(id, updatedBuild);
    return updatedBuild;
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = this.currentAlertId++;
    const alert: Alert = { 
      ...insertAlert, 
      id, 
      timestamp: new Date()
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async createDownloadableFile(insertFile: InsertDownloadableFile): Promise<DownloadableFile> {
    const id = this.currentFileId++;
    const file: DownloadableFile = { ...insertFile, id };
    this.downloadableFiles.set(id, file);
    return file;
  }

  async getDownloadableFilesByBuildId(buildId: number): Promise<DownloadableFile[]> {
    return Array.from(this.downloadableFiles.values()).filter(
      file => file.buildId === buildId
    );
  }

  async getDownloadableFile(id: number): Promise<DownloadableFile | undefined> {
    return this.downloadableFiles.get(id);
  }
}

export const storage = new MemStorage();
