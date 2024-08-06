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
    return <div className="text-center text-2xl mt-12">Post not found</div>;
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
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">My Blog</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
              <p className="text-sm text-indigo-100">
                Published on: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {post.content}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
            <Link
              href="/"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 mb-4 sm:mb-0"
            >
              ← Back to Home
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Delete Post
            </button>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2023 My Blog. All rights reserved.
        </div>
      </footer>
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
