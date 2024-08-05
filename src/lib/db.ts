import Database from "better-sqlite3";

let db: Database.Database;

if (typeof process === "object") {
  db = new Database("blog.sqlite");
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      slug TEXT UNIQUE
    )
  `);
}

export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
}

let posts: Post[] = [];

export function getPosts(): Post[] {
  return posts;
}

export function addPost(title: string, content: string, slug: string): void {
  const newPost: Post = {
    id: posts.length + 1,
    title,
    content,
    slug,
  };
  posts.push(newPost);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export async function deletePost(slug: string): Promise<boolean> {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index !== -1) {
    posts.splice(index, 1);
    return true;
  }
  return false;
}
