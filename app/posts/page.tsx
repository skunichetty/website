import { readFile, readdir, lstat } from "fs/promises";
import path from "path";
import Link from "next/link";
import { dateComparator } from "@/app/utils";
import { PostMetadata } from "@/components/post";
import { parse } from "yaml";

interface RawPostMetadata {
  title: string;
  date: string;
  editDate?: string;
  author: string;
  slug: string;
  keywords: string[];
  description: string;
}

async function getPosts() {
  const entries = await readdir("app/posts", { withFileTypes: true });
  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(entry.parentPath, entry.name));

  const raw_metadata: RawPostMetadata[] = await Promise.all(
    folders.map(async (folder) => {
      const filename = `${folder}/page.mdx`;
      const main = await readFile(filename);
      const content = main.toString().split("\n");

      let index = 0;
      if (content[index++] !== "---") {
        console.error(`Invalid MDX file "${filename}": no frontmatter found`);
      } else {
        while (index < content.length && content[index] != "---") {
          ++index;
        }
        return parse(content.slice(1, index).join("\n"));
      }
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

function PostInfo({
  title,
  date,
  editDate,
  author,
  slug,
  description,
}: PostMetadata) {
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

export default async function PostMainPage() {
  const posts = await getPosts();
  return (
    <div>
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
