import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const legalDir = path.join(process.cwd(), "content/legal");

const slugMap: Record<string, string> = {
  impressum: "impressum.md",
  datenschutz: "datenschutz.md",
  cookies: "cookies.md",
  privacy: "privacy.md",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!fs.existsSync(legalDir)) return [];
  return fs
    .readdirSync(legalDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(".md", "") }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} — XF2`,
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const filename = slugMap[slug] || `${slug}.md`;
  const filePath = path.join(legalDir, filename);

  if (!fs.existsSync(filePath)) notFound();

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const html = await marked(content);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-canvas pt-24 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent text-sm font-body mb-12 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>

          <header className="mb-12">
            <h1 className="font-display text-5xl font-bold uppercase text-text-primary tracking-tight">
              {String(data.title || slug)}
            </h1>
          </header>

          <div className="h-px bg-border mb-12" />

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
