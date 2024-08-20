import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeStarryNight from 'rehype-starry-night'
import NextBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  output: "export",
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ['katex'],
  },
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

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Wrap MDX and Next.js config with each other
export default withBundleAnalyzer(withMDX(nextConfig));
