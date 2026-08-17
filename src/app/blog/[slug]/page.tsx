import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Code } from "bright";
import { notFound } from "next/navigation";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import remarkGithubAlerts from "remark-github-alerts";

Code.theme = "github-dark";

const mdxComponents = {
  pre: Code,
  h1: (props: any) => <h1 className="text-3xl font-extrabold my-6" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold my-5 border-b pb-2" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold my-4" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-medium my-3" {...props} />,
  p: (props: any) => <p className="leading-relaxed my-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside my-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside my-4 space-y-1" {...props} />,
  li: (props: any) => <li className="ml-2" {...props} />,
  a: ({ href = "", children, ...props }: any) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} className="text-blue-500 hover:underline font-medium" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline font-medium"
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 text-gray-400" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-800 text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  table: (props: any) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full text-left border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="border-b border-gray-700 bg-gray-900/50" {...props} />,
  tbody: (props: any) => <tbody className="divide-y divide-gray-800" {...props} />,
  tr: (props: any) => <tr className="hover:bg-gray-800/40 transition-colors" {...props} />,
  th: (props: any) => (
    <th className="px-4 py-3 font-semibold text-gray-200 border-b border-gray-700" {...props} />
  ),
  td: (props: any) => <td className="px-4 py-3 text-gray-300" {...props} />,
};

export const generateStaticParams = async () => {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;
    const { meta } = getPostBySlug(slug);
    return {
      title: meta.title,
      description: meta.description,
    };
  } catch {
    return {};
  }
};

const BlogPost = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;
    const { meta, content } = getPostBySlug(slug);

    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
          &larr; Back to all posts
        </Link>
        
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">{meta.title}</h1>
          <p className="text-gray-500 text-sm mb-4">{meta.date}</p>

          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="bg-gray-800 text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono hover:underline"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <MDXRemote 
            source={content} 
            components={mdxComponents} 
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkGithubAlerts],
              },
            }}
          />
        </article>
      </main>
    );
  } catch {
    notFound();
  }
};

export default BlogPost;