import { readFile, readdir } from "fs/promises";
import path from "path";
import Link from "next/link";
import { dateComparator } from "@/app/utils";
import { PostMetadata } from "@/components/client/post";
import matter from "gray-matter";

interface RawPostMetadata {
  title: string;
  date: string;
  editDate?: string;
  keywords: string[];
  description: string;
  slug: string;
}

async function getPosts() {
  const entries = await readdir("content", { withFileTypes: true });
  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      return {
        fullpath: path.join(entry.parentPath, entry.name),
        slug: entry.name,
      };
    });

  const raw_metadata: RawPostMetadata[] = await Promise.all(
    folders.map(async ({ fullpath, slug }) => {
      const filename = `${fullpath}/page.mdx`;
      const contents = {
        ...matter(await readFile(filename)).data,
        slug,
      } as RawPostMetadata;
      return contents;
    })
  );

  return raw_metadata
    .map((post) => {
      let entry: PostMetadata = {
        ...post,
        date: new Date(post.date),
        editDate: undefined,
      };
      if (post.editDate != undefined) {
        entry.editDate = new Date(post.editDate);
      }
      return entry;
    })
    .sort((a, b) => {
      return dateComparator(a.date, b.date, false);
    });
}

function PostInfo({ title, date, editDate, slug, description }: PostMetadata) {
  return (
    <div className="block py-2">
      <Link
        className="text-xl hover:text-blue-500 transition"
        href={`/posts/${slug}`}
      >
        {title}
      </Link>
      <div className="flex flex-row gap-2 text-sm text-gray-600 dark:text-gray-400">
        <p>{date.toLocaleDateString()}</p>
        {editDate != undefined ? (
          <p>(Edited {editDate.toLocaleDateString()})</p>
        ) : null}
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
        {description}
      </div>
    </div>
  );
}

function BlogPostLd({ posts }: { posts: PostMetadata[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          url: "https://skunichetty.dev/posts",
          name: "skunichetty.dev",
          description: "All Blog Posts by Sachchit Kunichetty",
          blogPost: posts.map((post) => {
            return {
              "@type": "BlogPosting",
              headline: post.title,
              url: `https://skunichetty.dev/posts/${post.slug}`,
              datePublished: post.date.toISOString(),
              dateModified: post.editDate?.toISOString(),
              description: post.description,
            };
          }),
        }),
      }}
    />
  );
}

export default async function PostMainPage() {
  const posts = await getPosts();
  return (
    <div>
      <BlogPostLd posts={posts} />
      <h1 className="text-2xl font-bold">Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No posts yet - check back later!
        </p>
      ) : (
        <div className="flex flex-col divide-y-2">
          {posts.map((post) => (
            <PostInfo key={post.slug} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}
