import { createElement } from "react";
import { IconType } from "react-icons";
import {
  IoArrowBackCircle,
  IoArrowBackSharp,
  IoArrowForward,
  IoArrowForwardCircle,
  IoArrowForwardSharp,
  IoBrowsersOutline,
  IoCalendarOutline,
  IoCaretDown,
  IoCaretUp,
  IoClipboardOutline,
  IoCodeSlashSharp,
  IoCopyOutline,
  IoLibrarySharp,
  IoLocationSharp,
  IoLogoDiscord,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoSlack,
  IoLogoTwitter,
  IoMail,
  IoMenu,
  IoSchoolSharp,
  IoTerminalSharp,
  IoTimeSharp,
} from "react-icons/io5";

interface IconProps {
  name: string;
}

interface IconMap {
  [key: string]: IconType;
}

const iconMap: IconMap = {
  envelope: IoMail,
  instagram: IoLogoInstagram,
  linkedin: IoLogoLinkedin,
  github: IoLogoGithub,
  twitter: IoLogoTwitter,
  caret_up: IoCaretUp,
  caret_down: IoCaretDown,
  "arrow-left": IoArrowBackCircle,
  "arrow-right": IoArrowForwardCircle,
  "arrow-stem-left": IoArrowForward,
  clipboard: IoClipboardOutline,
  website: IoBrowsersOutline,
  slack: IoLogoSlack,
  copy: IoCopyOutline,
  calendar: IoCalendarOutline,
  discord: IoLogoDiscord,
  menu: IoMenu,
  "arrow-left-sharp": IoArrowBackSharp,
  "arrow-right-sharp": IoArrowForwardSharp,
  code: IoCodeSlashSharp,
  terminal: IoTerminalSharp,
  graduation: IoSchoolSharp,
  library: IoLibrarySharp,
  time: IoTimeSharp,
  location: IoLocationSharp,
};

export default function Icon({ name }: IconProps) {
  if (!(name in iconMap)) {
    console.error("Could not find name " + name);
    return null;
  }
  return createElement(iconMap[name], { name });
}
