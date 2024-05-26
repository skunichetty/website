"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Dropdown from "@/components/dropdown";
import ExperienceList from "@/components/experience_list";

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
    end_date: new Date("August 2022"),
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
];

interface LineWithHeadingProps {
  heading: string;
  description: string;
}

function LineWithHeading({ heading, description }: LineWithHeadingProps) {
  return (
    <p className="text-gray-400">
      <span className="text-white">{heading}:</span> {description}
    </p>
  );
}

export default function Home() {
  const main = useRef(null);

  useGSAP(
    () => {
      gsap.from(".line1", { y: 25, opacity: 0, duration: 1 });
      gsap.from(".line2", { y: 35, opacity: 0, duration: 1.15 });
      gsap.from(".info", { y: 45, opacity: 0, duration: 1.25 });
    },
    { scope: main }
  );

  return (
    <div className="sm:w-4/5 w-full" ref={main}>
      <div className="block h-fit mt-6">
        <div className="line1 text-4xl">Hi, I&apos;m Sachchit.</div>
        <div className="line2 sm:text-2xl text-xl mt-1">
          I&apos;m a software engineer and computer scientist.
        </div>
      </div>
      <div className="info grid grid-row-1 grid-col-3 gap-1 my-5">
        <Dropdown icon="terminal" title="Work Experience">
          <ExperienceList experiences={experiences} />
        </Dropdown>
        <Dropdown icon="graduation" title="Education">
          <div className="md:text-base sm:text-sm text-xs text-gray-400 sm:max-w-md max-w-sm ">
            <p className="text-white">
              Bachelor of Science in Engineering, Computer Science
            </p>
            <div className="md:text-sm text-xs">
              <div className="flex flex-row justify-between">
                <p>University of Michigan, Ann Arbor</p>
                <p>Aug 2020 - Apr 2024</p>
              </div>
              <p>Minors in Business Administration, Mathematics</p>
            </div>
          </div>
        </Dropdown>
        <Dropdown icon="library" title="Skills">
          <div className="md:text-sm text-xs text-white">
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
