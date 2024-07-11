import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { PostHeader, Callout, BlockEquation, Example, Definition, ImageWithCaption } from "@/components/post";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ id, children }) => (
      <h1 id={id} className="text-3xl font-bold mt-5 mb-1">{children}</h1>
    ),
    h2: ({ id, children }) => (
      <h2 id={id} className="text-2xl font-bold mt-3 mb-1">{children}</h2>
    ),
    h3: ({ id, children }) => <h3 className="text-2xl mt-3 mb-1">{children}</h3>,
    h4: ({ id, children }) => (
      <h4 id={id} className="text-xl font-medium mt-2 mb-1">{children}</h4>
    ),
    ul: ({ children }) => <ul className="list-disc ml-5">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal ml-5">{children}</ol>,
    li: ({ children }) => <li className="sm:text-base text-sm sm:my-0 my-1">{children}</li>,
    em: ({ children }) => <em className="mr-[0.125rem]">{children}</em>,
    p: ({ children }) => (
      <p className=" sm:text-base text-sm mt-3">{children}</p>
    ),
    a: (props) => (
      <Link
        className="underline font-semibold hover:text-blue-500 transition"
        href={props.href || ""}
        {...props}
      >
        {props.children}
      </Link>
    ),
    code: ({ children }) => (
      <code className="text-sm p-1 bg-stone-850 dark:bg-stone-800 rounded-md text-blue-500">
        {children}
      </code>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 dark:text-gray-400 text-gray-600 border-stone-900 dark:border-stone-100">
        {children}
      </blockquote>
    ),
    PostHeader,
    Callout,
    BlockEquation,
    Example,
    Definition,
    ImageWithCaption,
    ...components,
  };
}
