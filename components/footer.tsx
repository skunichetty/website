import Link from "next/link";
import Icon from "./icon";
import SocialMediaLink from "./social";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-center items-center gap-2 mt-auto p-10 text-gray-400 divide-x-2 divide-gray-400">
      <div className="flex flex-row justify-center items-center gap-2">
        <SocialMediaLink
          type="linkedin"
          link="https://www.linkedin.com/in/sachchit-kunichetty/"
        />
        <SocialMediaLink type="envelope" link="mailto:sachchitku@gmail.com" />
        <SocialMediaLink type="github" link="https://github.com/skunichetty" />
      </div>
      <Link
        href="https://github.com/skunichetty/website"
        className="hover:text-blue-500 transition px-2"
      >
        <Icon name="code" />
      </Link>
    </footer>
  );
}
