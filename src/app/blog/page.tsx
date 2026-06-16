import Link from "next/link";
import { getPosts } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Journal — XF2 MastLOCK",
  description: "Engineering notes, product updates, and riding insights from the XF2 team.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-canvas pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-accent text-xs tracking-[0.3em] uppercase font-body block mb-4">
              XF2
            </span>
            <h1 className="font-display text-6xl sm:text-7xl font-bold uppercase text-text-primary tracking-tight mb-4">
              Journal
            </h1>
            <p className="text-text-secondary font-body text-base">
              Engineering notes, product updates, and riding insights.
            </p>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="border border-border rounded-xl p-12 text-center">
              <p className="text-text-secondary font-body">No posts yet — check back soon.</p>
            </div>
          ) : (
            <div className="space-y-px">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="group border border-transparent hover:border-border rounded-xl px-6 py-5 -mx-6 transition-all duration-300 hover:bg-surface/40">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-text-secondary text-xs font-mono mb-2">
                          {post.date}
                        </p>
                        <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-text-primary group-hover:text-accent transition-colors duration-200 tracking-tight">
                          {post.title}
                        </h2>
                        {post.description && (
                          <p className="text-text-secondary font-body text-sm mt-2 leading-relaxed">
                            {post.description}
                          </p>
                        )}
                      </div>
                      <svg
                        className="shrink-0 mt-1 text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
