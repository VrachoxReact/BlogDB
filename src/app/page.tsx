import { Suspense } from "react";
import AddBlogPost from "../components/AddBlogPost";
import BlogList from "../components/BlogList";
import { Post } from "../lib/db";
import ClientHome from "../components/ClientHome";

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function Home() {
  const initialPosts = await getPosts();

  return <ClientHome initialPosts={initialPosts} />;
}
