import { NextResponse } from "next/server";
import { getPostBySlug, deletePost } from "../../../../lib/db";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const post = await getPostBySlug(params.slug);
  if (post) {
    return NextResponse.json(post);
  }
  return new NextResponse(null, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const success = await deletePost(params.slug);
  if (success) {
    return NextResponse.json({ success: true });
  }
  return new NextResponse(null, { status: 404 });
}
