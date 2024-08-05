"use client";

import { useState } from "react";

interface AddBlogPostProps {
  onAddPost: (
    title: string,
    content: string,
    slug: string
  ) => Promise<{ success: boolean; error?: string }>;
}

export default function AddBlogPost({ onAddPost }: AddBlogPostProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const slug = title.toLowerCase().replace(/\s+/g, "-");
      const result = await onAddPost(title, content, slug);
      if (result.success) {
        setTitle("");
        setContent("");
      } else {
        setError(result.error || "Failed to add post");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-8"
    >
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4">
        Add New Post
      </h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog post title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter blog post content"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
      >
        Add Post
      </button>
    </form>
  );
}
