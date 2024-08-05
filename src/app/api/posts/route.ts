import { NextResponse } from "next/server";
import { getPosts, addPost } from "../../../lib/db";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const { title, content, slug } = await request.json();
  await addPost(title, content, slug);
  return NextResponse.json({ success: true });
}
