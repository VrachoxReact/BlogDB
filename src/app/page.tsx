import { Suspense } from "react";
import AddBlogPost from "../components/AddBlogPost";
import BlogList from "../components/BlogList";
import { Post } from "../lib/db";

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default async function Home() {
  const initialPosts = await getPosts();

  async function handleAddPost(title: string, content: string, slug: string) {
    "use server";
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, slug }),
    });
    if (!res.ok) {
      throw new Error("Failed to add post");
    }
    return { success: true };
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Latest Posts</h2>
      <AddBlogPost onAddPost={handleAddPost} />
      <Suspense fallback={<div className="text-center">Loading posts...</div>}>
        <BlogList initialPosts={initialPosts} />
      </Suspense>
    </div>
  );
}
