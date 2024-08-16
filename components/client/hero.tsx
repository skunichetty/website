"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

function generateNoise(width: number, height: number, opacity: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.floor(Math.random() * 256);
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = Math.floor(opacity * 255);
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }
  return "";
}


export default function Hero() {
  const hero = useRef<HTMLDivElement>(null);
  const heroContent = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      hero.current,
      { xPercent: 100 },
      {
        opacity: 1,
        duration: 2,
        xPercent: 0,
        ease: "power1.out",
      }
    );
    gsap.to(heroContent.current, {
      opacity: 1,
      duration: 1,
      delay: 2.2,
    });
  });

  useEffect(() => {
    if (heroContent.current) {
      const noiseImage = generateNoise(
        heroContent.current.offsetWidth,
        heroContent.current.offsetHeight,
        0.02
      );
      heroContent.current.style.backgroundImage = `url(${noiseImage})`;
    }
  }, []);

  return (
    <div
      className="opacity-0 bg-gradient-to-l from-blue-500 text-center w-full sm:h-52 h-40 mt-5 relative"
      ref={hero}
    >
      <div ref={heroContent} className="opacity-0 w-full h-full"></div>
    </div>
  );
}
