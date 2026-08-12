import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Recent articles and technical guides",
};

export const BlogIndex = () => {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-6">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 my-1">{post.date}</p>
              <p className="text-gray-600">{post.description}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
};

export default BlogIndex;