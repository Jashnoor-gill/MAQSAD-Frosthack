import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

async function setupDatabase() {
  try {
    const db = await dbPromise;

    // Users table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `);

    // Creations table (for storing AI-generated content)
    await db.exec(`
      CREATE TABLE IF NOT EXISTS creations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        type TEXT NOT NULL,  -- image, text, music, etc.
        content TEXT NOT NULL,  -- JSON or file path
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    // Templates table (for reusable AI templates)
    await db.exec(`
      CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,  -- AI model type (image, text, etc.)
        settings TEXT NOT NULL -- JSON settings for AI generation
      );
    `);

    console.log("Database setup complete.");
  } catch (error) {
    console.error("Error setting up database:", error);
  }
}

setupDatabase();

export default dbPromise;



