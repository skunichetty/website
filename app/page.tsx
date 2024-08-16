import Dropdown from "@/components/client/dropdown";
import ExperienceList from "@/components/server/experience_list";
import Location from "@/components/client/location";
import Hero from "@/components/client/hero";

interface LineWithHeadingProps {
  heading: string;
  description: string;
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
  return (
    <div className="overflow-hidden">
      <div className="block h-fit mt-6 sm:w-4/5 w-full px-10">
        <div className="line text-4xl">Hi, I&apos;m Sachchit.</div>
        <div className="line sm:text-2xl text-xl mt-1">
          I&apos;m a software engineer and computer scientist.
        </div>
        <div className="line">
          <Location />
        </div>
      </div>
      <Hero />
      <div className="info grid grid-row-1 grid-col-3 gap-1 px-10 my-5 sm:w-4/5 w-full">
        <Dropdown icon="terminal" title="Work Experience">
          <ExperienceList />
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
                <b>Minors:</b> Business Administration, Mathematics
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <b>GPA:</b> 3.97/4.00 (Summa Cum Laude)
              </p>
            </div>
          </div>
        </Dropdown>
        <Dropdown icon="library" title="Skills">
          <div className="md:text-sm text-xs">
            <LineWithHeading
              heading="Programming Languages"
              description="C++, Python"
            />
            <LineWithHeading
              heading="Operating Systems:"
              description="Linux, MacOS, (some) Windows"
            />
            <LineWithHeading
              heading="Tools and Software"
              description="(Neo)vim, VSCode, Git, Docker, CMake, Figma"
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
