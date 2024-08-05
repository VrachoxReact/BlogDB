import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Post } from "../../lib/db";

interface BlogPostProps {
  post: Post | null;
}

export default function BlogPost({ post }: BlogPostProps) {
  const router = useRouter();

  if (!post) {
    return (
      <div style={{ textAlign: "center", fontSize: "24px", marginTop: "48px" }}>
        Post not found
      </div>
    );
  }

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${post.slug}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to delete post");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #EBF8FF, #FFFFFF)",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(to right, #3182CE, #2C5282)",
            color: "white",
            padding: "24px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {post.title}
          </h1>
          <p style={{ fontSize: "14px", color: "#BEE3F8" }}>
            Published on: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div style={{ padding: "24px" }}>
          <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#2D3748" }}>
            {post.content}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "800px",
          margin: "24px auto 0",
        }}
      >
        <Link
          href="/"
          style={{
            background: "#3182CE",
            color: "white",
            padding: "12px 24px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Back to Home
        </Link>
        <button
          onClick={handleDelete}
          style={{
            background: "#E53E3E",
            color: "white",
            padding: "12px 24px",
            borderRadius: "4px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`);
  const post = res.ok ? await res.json() : null;

  return {
    props: {
      post,
    },
  };
};
