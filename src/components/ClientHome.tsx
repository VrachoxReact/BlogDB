"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import AddBlogPost from "./AddBlogPost";
import BlogList from "./BlogList";
import { Post } from "../lib/db";

interface ClientHomeProps {
  initialPosts: Post[];
}

export default function ClientHome({ initialPosts }: ClientHomeProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    if (res.ok) {
      const newPosts = await res.json();
      setPosts(newPosts);
    }
  };

  async function handleAddPost(title: string, content: string, slug: string) {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, slug }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      await fetchPosts(); // Refresh posts after adding a new one
      return { success: true };
    } catch (error) {
      console.error("Failed to add post:", error);
      return { success: false, error: "Failed to add post" };
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Latest Posts</h2>
      <AddBlogPost onAddPost={handleAddPost} />
      <Suspense fallback={<div className="text-center">Loading posts...</div>}>
        {posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <div className="text-center">No posts available</div>
        )}
      </Suspense>
    </div>
  );
}
