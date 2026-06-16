import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { getPosts, getPost } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — XF2 Journal`,
    description: post.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await marked(post.content);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-canvas pt-24 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent text-sm font-body mb-12 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Journal
          </Link>

          {/* Post header */}
          <header className="mb-12">
            <p className="text-text-secondary text-xs font-mono mb-4">{post.date}</p>
            <h1 className="font-display text-5xl sm:text-6xl font-bold uppercase text-text-primary tracking-tight mb-4">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-text-secondary font-body text-lg leading-relaxed">
                {post.description}
              </p>
            )}
          </header>

          {/* Separator */}
          <div className="h-px bg-border mb-12" />

          {/* Post content */}
          <article
            className="post-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
