import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
}

export async function getPosts(): Promise<Post[]> {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM posts ORDER BY id DESC");
    return result.rows;
  } finally {
    client.release();
  }
}

export async function addPost(
  title: string,
  content: string,
  slug: string
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO posts (title, content, slug) VALUES ($1, $2, $3)",
      [title, content, slug]
    );
  } finally {
    client.release();
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM posts WHERE slug = $1", [
      slug,
    ]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function deletePost(slug: string): Promise<boolean> {
  const client = await pool.connect();
  try {
    const result = await client.query("DELETE FROM posts WHERE slug = $1", [
      slug,
    ]);
    // Use the nullish coalescing operator to provide a default value of 0
    const rowCount = result.rowCount ?? 0;
    return rowCount > 0;
  } finally {
    client.release();
  }
}

// Initialize the database table
async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL
      )
    `);
  } finally {
    client.release();
  }
}

initializeDatabase().catch(console.error);
