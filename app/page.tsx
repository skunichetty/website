"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Home() {
  const main = useRef(null);

  useGSAP(
    () => {
      gsap.from(".line1", { y: 25, opacity: 0, duration: 1 });
      gsap.from(".line2", { y: 35, opacity: 0, duration: 1.15 });
    },
    { scope: main }
  );

  return (
    <div>
      <div className="block h-fit mt-6" ref={main}>
        <div className="line1 text-4xl">Hi, I&apos;m Sachchit.</div>
        <div className="line2 text-2xl mt-1">
          I&apos;m a software engineer and computer scientist.
        </div>
      </div>
    </div>
  );
}
