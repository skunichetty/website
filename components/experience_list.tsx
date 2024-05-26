import Link from "next/link";
import Icon from "./icon";

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
}: ExperienceItemProps) {
  const today = new Date();
  const current =
    start_date < today && (end_date == undefined || end_date > today);

  return (
    <div className="flex flex-col md:text-base sm:text-sm text-xs">
      <p>
        {current ? (
          <span className=" text-blue-500 font-bold">(Current)&nbsp;</span>
        ) : null}
        {position} &nbsp;@&nbsp;
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
      </p>
      <p className="text-gray-400">
        {fmt_date(start_date)}
        {end_date != undefined ? ` - ${fmt_date(end_date)}` : ""}
      </p>
    </div>
  );
}

interface ExperienceListProps {
  experiences: ExperienceItemProps[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <ul className="list-disc ml-4">
      {experiences
        .sort((a, b) => {
          const a_date = a.end_date == undefined ? Date.now() : a.end_date;
          const b_date = b.end_date == undefined ? Date.now() : b.end_date;
          if (a_date < b_date) {
            return 1;
          } else if (a_date > b_date) {
            return -1;
          } else {
            return 0;
          }
        })
        .map((experience) => (
          <li className="" key={experience.position}>
            <ExperienceItem {...experience} />
          </li>
        ))}
    </ul>
  );
}
