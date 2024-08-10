import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";
import { PostHeader, Callout, BlockEquation, Example, Definition, ImageWithCaption } from "@/components/post";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ id, children }) => (
      <h1 id={id} className="text-3xl font-bold mt-10 mb-1">{children}</h1>
    ),
    h2: ({ id, children }) => (
      <h2 id={id} className="text-2xl font-bold mt-7 mb-1">{children}</h2>
    ),
    h3: ({ id, children }) => <h3 className="text-xl font-bold mt-5 mb-1">{children}</h3>,
    h4: ({ id, children }) => (
      <h4 id={id} className="text-xl font-medium mt-4 mb-1">{children}</h4>
    ),
    ul: ({ children }) => <ul className="list-disc ml-5 my-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal ml-5 my-2">{children}</ol>,
    li: ({ children }) => <li className="sm:text-base text-sm sm:my-0 my-1 mx-1">{children}</li>,
    em: ({ children }) => <em className="mr-[0.125rem]">{children}</em>,
    p: ({ children }) => (
      <p className="sm:text-base text-sm mt-3">{children}</p>
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
    code: (props) => (
      <code className={`mr-1 bg-stone-850 dark:bg-stone-800 rounded-md ${props.className}`}> 
         {props.children}
       </code>
    ),
    pre: ({children}) => (
       <pre className="sm:text-base text-xs dark:bg-stone-800 bg-stone-850 rounded-md p-4 mx-1 mt-3 overflow-x-scroll">
         {children}
       </pre>
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
    Image,
    ...components,
  };
}
