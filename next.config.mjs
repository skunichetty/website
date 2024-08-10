import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeStarryNight from 'rehype-starry-night'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  output: "export",
  images: { unoptimized: true },
};

function remarkMdxFrontmatterWithOptions() {
  return remarkMdxFrontmatter({
    name: "metadata",
  });
}

function remarkTocWithOptions() {
  return remarkToc({
    tight: true,
    maxDepth: 2,
    ordered: true
  });
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatterWithOptions,
      remarkMath,
      remarkTocWithOptions 
    ],
    rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        rehypeStarryNight
    ],
  },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
