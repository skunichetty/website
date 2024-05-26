import Link from "next/link";
import Icon from "./icon";

interface SocialMediaLinkProps {
  type: string;
  link: string;
}

const allowedSocials = new Set(["linkedin", "github", "envelope"]);

export default function SocialMediaLink({ type, link }: SocialMediaLinkProps) {
  if (!allowedSocials.has(type)) {
    console.log(
      `Could not find social: ${type}. Allowed types: ${allowedSocials}`
    );
    return null;
  }
  return (
    <Link href={link} className="hover:text-blue-500 transition">
      <Icon name={type} />
    </Link>
  );
}
