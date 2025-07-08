import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const builds = pgTable("builds", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  sourceType: text("source_type").notNull(), // 'file' or 'github'
  sourceUrl: text("source_url"),
  status: text("status").notNull().default("pending"), // 'pending', 'building', 'success', 'failed'
  hash: text("hash"),
  buildTime: integer("build_time"), // in seconds
  fileCount: integer("file_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  errorMessage: text("error_message"),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  type: text("type").notNull().default("security"), // 'security', 'build', 'system'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const downloadableFiles = pgTable("downloadable_files", {
  id: serial("id").primaryKey(),
  buildId: integer("build_id").references(() => builds.id),
  filename: text("filename").notNull(),
  filepath: text("filepath").notNull(),
  filesize: integer("filesize").notNull(),
  fileType: text("file_type").notNull(), // 'executable', 'license', 'hash'
});

export const insertBuildSchema = createInsertSchema(builds).omit({
  id: true,
  createdAt: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  timestamp: true,
});

export const insertDownloadableFileSchema = createInsertSchema(downloadableFiles).omit({
  id: true,
});

export type InsertBuild = z.infer<typeof insertBuildSchema>;
export type Build = typeof builds.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;
export type InsertDownloadableFile = z.infer<typeof insertDownloadableFileSchema>;
export type DownloadableFile = typeof downloadableFiles.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
