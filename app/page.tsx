"use client";
import Dropdown from "@/components/dropdown";
import ExperienceList from "@/components/experience_list";
import Location from "@/components/location";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const experiences = [
  {
    position: "Software Engineer Intern",
    start_date: new Date("May 2023"),
    end_date: new Date("August 2023"),
    company: "Wolverine Trading",
    href: "https://www.wolve.com",
    location: "Chicago, IL",
  },
  {
    position: "Machine Learning Engineer Intern",
    start_date: new Date("May 2022"),
    end_date: new Date("July 2022"),
    company: "Mage",
    href: "https://www.mage.ai",
    location: "Santa Clara, CA",
  },
  {
    position: "Lead Instructional Aide - Machine Learning",
    start_date: new Date("August 2022"),
    end_date: new Date("April 2024"),
    company: "University of Michigan CSE",
    location: "Ann Arbor, MI",
  },
  {
    position: "Teaching Assistant",
    start_date: new Date("September 2021"),
    end_date: new Date("April 2022"),
    company: "University of Michigan Physics",
    location: "Ann Arbor, MI",
  },
];

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

interface LineWithHeadingProps {
  heading: string;
  description: string;
}

function Hero() {
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
function LineWithHeading({ heading, description }: LineWithHeadingProps) {
  return (
    <p>
      {heading}:&nbsp;&nbsp;
      <span className="text-gray-600 dark:text-gray-400">{description}</span>
    </p>
  );
}

export default function Home() {
  const locationInfo = useRef(null);

  useGSAP(() => {
    gsap.to(locationInfo.current, {
      opacity: 1,
      duration: 2,
      xPercent: 0,
      ease: "power1.out",
    });
  });
  return (
    <div className="overflow-hidden">
      <div className="block h-fit mt-6 sm:w-4/5 w-full px-10">
        <div className="line text-4xl">Hi, I&apos;m Sachchit.</div>
        <div className="line sm:text-2xl text-xl mt-1">
          I&apos;m a software engineer and computer scientist.
        </div>
        <div className="line opacity-0" ref={locationInfo}>
          <Location />
        </div>
      </div>
      <Hero />
      <div className="info grid grid-row-1 grid-col-3 gap-1 px-10 my-5 sm:w-4/5 w-full">
        <Dropdown icon="terminal" title="Work Experience">
          <ExperienceList experiences={experiences} />
        </Dropdown>
        <Dropdown icon="graduation" title="Education">
          <div className="md:text-base sm:text-sm text-xs sm:max-w-md max-w-sm ">
            <p>Bachelor of Science in Engineering, Computer Science</p>
            <div className="md:text-sm text-xs text-gray-600 dark:text-gray-400">
              <div className="flex flex-row justify-between">
                <p>University of Michigan, Ann Arbor</p>
                <p>Aug 2020 - Apr 2024</p>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Minors in Business Administration, Mathematics
              </p>
            </div>
          </div>
        </Dropdown>
        <Dropdown icon="library" title="Skills">
          <div className="md:text-sm text-xs">
            <LineWithHeading
              heading="Programming Languages"
              description="C++, Python, TypeScript, Rust"
            />
            <LineWithHeading
              heading="Tools and Software"
              description="Linux, (Neo)vim, Valgrind, Docker, Wireshark, CMake"
            />
            <LineWithHeading
              heading="Other Skills"
              description="Machine Learning, Operating Systems, Web Development (Full Stack)"
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
