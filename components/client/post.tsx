"use client";
import katex from "katex";
import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

export interface PostMetadata {
  title: string;
  date: Date;
  editDate?: Date;
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

interface ImageWithCaptionProps {
  src: string | StaticImageData;
  alt: string;
  caption: string;
  allowInvert: boolean;
}

interface PostHeroProps {
  src: string | StaticImageData;
  alt: string;
}

export function PostHeader({ title, date }: PostHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className="sm:text-5xl text-3xl font-bold mb-2">{title}</h1>
      <h4 className="text-sm text-gray-600 dark:text-gray-400">
        {date.toLocaleDateString()}
      </h4>
    </div>
  );
}

export function Callout({ emoji, children }: CalloutProps) {
  return (
    <div className="flex flex-row items-center sm:px-6 px-2 pb-5 pt-2 border-2 border-stone-900 dark:border-stone-100 my-4 sm:mx-8 mx-2 bg-stone-300 dark:bg-stone-900 rounded-2xl">
      <p className="sm:block hidden text-2xl mt-3">{emoji}</p>
      <div className="px-5 col-span-2 overflow-auto">{children}</div>
    </div>
  );
}

export function Example({ children }: ExampleProps) {
  return (
    <div className="px-6 py-5 border-2 border-blue-500 my-4 sm:mx-8 mx-0 bg-stone-300 dark:bg-stone-900 rounded-2xl">
      <p className="font-bold">Example:</p>
      {children}
    </div>
  );
}

export function Definition({ children }: ExampleProps) {
  return (
    <div className="px-6 py-5 border-2 border-green-500 my-4 sm:mx-8 mx-0 bg-stone-300 dark:bg-stone-900 rounded-2xl">
      <p className="font-bold">Definition:</p>
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
  return (
    <div
      ref={body}
      className="mt-3 px-5 justify-normal  text-xs md:text-base overflow-auto"
    ></div>
  );
}

export function ImageWithCaption({
  src,
  alt,
  caption,
  allowInvert,
}: ImageWithCaptionProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-screen-md text-center sm:my-10 my-3">
        <Image
          className={`sm:px-5 mb-2 ${!allowInvert || "dark:invert-0 invert"}`}
          src={src}
          alt={alt}
        />
        <p className="sm:text-sm text-xs dark:text-gray-400 text-gray-600">
          {caption}
        </p>
      </div>
    </div>
  );
}

export function PostHero({ src, alt }: PostHeroProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center sm:my-10 my-3">
        <Image className="mb-2" src={src} alt={alt} />
      </div>
    </div>
  );
}
