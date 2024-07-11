import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";

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

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatterWithOptions,
      remarkMath,
    ],
    rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
    ],
  },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
