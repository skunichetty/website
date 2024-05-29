"use client";
import katex from "katex";
import { MutableRefObject, useEffect, useRef } from "react";

export interface PostMetadata {
  title: string;
  date: Date;
  editDate?: Date;
  author: string;
  slug: string;
  keywords: string[];
  description: string;
}

interface PostHeaderProps {
  title: string;
  date: Date;
}

interface CalloutProps {
  emoji: string;
  children: React.ReactNode;
}

interface ExampleProps {
  emoji: string;
  children: React.ReactNode;
}

interface BlockEquationProps {
  latex: string;
}

export function PostHeader({ title, date }: PostHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className="text-5xl font-bold">{title}</h1>
      <h4 className="text-sm text-gray-500 dark:text-gray-400">
        {date.toLocaleDateString()}
      </h4>
    </div>
  );
}

export function Callout({ emoji, children }: CalloutProps) {
  return (
    <div className="flex flex-row items-center px-6 pb-5 pt-2 border-2 my-4 mx-8 bg-stone-950 dark:bg-stone-900">
      <p className="text-2xl">{emoji}</p>
      <div className="px-5 col-span-2">{children}</div>
    </div>
  );
}

export function Example({ children }: ExampleProps) {
  return (
    <div className="px-6 py-5 border-2 border-blue-500 my-4 mx-8 bg-stone-950 dark:bg-stone-900">
      <p className="font-bold">Example:</p>
      {children}
    </div>
  );
}

export function BlockEquation({ latex }: BlockEquationProps) {
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (body.current != null) {
      katex.render(latex, body.current, {
        displayMode: true,
      });
    }
  });
  return <div ref={body} className="mt-3 flex flex-row justify-center"></div>;
}
