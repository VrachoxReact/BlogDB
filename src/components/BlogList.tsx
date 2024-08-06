"use client";

import Link from "next/link";
import { Post } from "../lib/db";

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
