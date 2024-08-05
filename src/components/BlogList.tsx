"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "../lib/db";

interface BlogListProps {
  initialPosts: Post[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [posts, setPosts] = useState(initialPosts);

  const refreshPosts = async () => {
    const response = await fetch("/api/posts");
    const updatedPosts = await response.json();
    setPosts(updatedPosts);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={refreshPosts}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
      >
        Refresh Posts
      </button>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {post.content.substring(0, 150)}...
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
