import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename
        .replace(/^\d{4}-\d{2}-\d{2}-/, "")
        .replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title || slug),
        date: String(data.date || ""),
        description: String(data.description || ""),
        content,
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPost(slug: string): Post | null {
  if (!fs.existsSync(postsDir)) return null;
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const file = files.find((f) =>
    f.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "") === slug
  );
  if (!file) return null;

  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title || slug),
    date: String(data.date || ""),
    description: String(data.description || ""),
    content,
  };
}
