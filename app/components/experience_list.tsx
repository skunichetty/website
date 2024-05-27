import Link from "next/link";
import { dateComparator } from "../utils";

interface ExperienceItemProps {
  position: string;
  start_date: Date;
  end_date?: Date;
  company: string;
  href?: string;
  location: string;
}

function fmt_date(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: undefined,
    year: "numeric",
    day: undefined,
    month: "short",
  });
}

export function ExperienceItem({
  position,
  start_date,
  end_date,
  company,
  href,
  location,
}: ExperienceItemProps) {
  const today = new Date();
  const current =
    start_date < today && (end_date == undefined || end_date > today);

  return (
    <div>
      <p className="flex flex-col md:text-base sm:text-sm text-xs w-full">
        {current ? (
          <span className=" text-blue-500 font-bold">(Current)&nbsp;</span>
        ) : null}
        {position}
      </p>
      <div className="text-gray-500 dark:text-gray-400 md:text-sm text-xs flex flex-row justify-between">
        <div className="flex flex-row">
          {href == undefined ? (
            <span>{company}</span>
          ) : (
            <Link
              className="font-bold underline hover:text-blue-500 transition"
              href={href}
            >
              {company}
            </Link>
          )}
          <div className="sm:block hidden">
            &nbsp;&nbsp;•&nbsp;&nbsp;{location}
          </div>
        </div>
        <div>
          {fmt_date(start_date)}
          {end_date != undefined ? ` - ${fmt_date(end_date)}` : ""}
        </div>
      </div>
    </div>
  );
}

interface ExperienceListProps {
  experiences: ExperienceItemProps[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <ul className="sm:max-w-md max-w-sm divide-y-2 divide-gray-400">
      {experiences
        .sort((a, b) => {
          const a_date = a.end_date == undefined ? new Date() : a.end_date;
          const b_date = b.end_date == undefined ? new Date() : b.end_date;
          return dateComparator(a_date, b_date, false);
        })
        .map((experience) => (
          <li className="py-2" key={experience.position}>
            <ExperienceItem {...experience} />
          </li>
        ))}
    </ul>
  );
}
