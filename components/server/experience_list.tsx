import Link from "next/link";
import { dateComparator } from "@/app/utils";

interface RawExperienceItemProps {
  id: number;
  position_name: string;
  company_name: string;
  company_url?: string;
  start_date: string;
  end_date?: string;
  city: string;
  state: string;
  current: boolean;
}

interface ExperienceItemProps
  extends Omit<Omit<RawExperienceItemProps, "start_date">, "end_date"> {
  start_date: Date;
  end_date?: Date;
}

function fmt_date(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: undefined,
    year: "numeric",
    day: undefined,
    month: "short",
  });
}

function fmt_location(city: string, state: string) {
  let abbreviatedState = state;
  switch (state) {
    case "Michigan":
      abbreviatedState = "MI";
      break;

    case "California":
      abbreviatedState = "CA";

    case "Illinois":
      abbreviatedState = "IL";

    default:
      break;
  }

  return `${city}, ${abbreviatedState}`;
}

function getEnv(key: string) {
  const value = process.env[key];
  if (value === undefined || value === null) {
    throw new Error(`Could not find '${key}' in environment`);
  }
  return value;
}

export function ExperienceItem({
  position_name,
  company_name,
  company_url,
  start_date,
  end_date,
  city,
  state,
  current,
}: ExperienceItemProps) {
  return (
    <div>
      <p className="flex flex-row md:text-base sm:text-sm text-xs w-full">
        {current ? (
          <span className=" text-blue-500 font-bold mr-1">(Current)&nbsp;</span>
        ) : null}
        {position_name}
      </p>
      <div className="text-gray-600 dark:text-gray-400 md:text-sm text-xs flex flex-row justify-between">
        <div className="flex flex-row">
          {company_url == undefined ? (
            <span>{company_name}</span>
          ) : (
            <Link
              className="font-bold underline hover:text-blue-500 transition"
              href={company_url}
            >
              {company_name}
            </Link>
          )}
          <div className="sm:block hidden">
            &nbsp;&nbsp;•&nbsp;&nbsp;{fmt_location(city, state)}
          </div>
        </div>
        <div>
          {fmt_date(start_date)}
          {end_date != undefined ? ` - ${fmt_date(end_date)}` : " - Present"}
        </div>
      </div>
    </div>
  );
}

interface ExperienceListProps {
  experiences: ExperienceItemProps[];
}

export function ExperienceListView({ experiences }: ExperienceListProps) {
  return (
    <ul className="sm:max-w-md max-w-sm divide-y-2 divide-gray-400">
      {experiences
        .sort((a, b) => {
          const a_date = a.end_date == undefined ? new Date() : a.end_date;
          const b_date = b.end_date == undefined ? new Date() : b.end_date;
          return dateComparator(a_date, b_date, false);
        })
        .map((experience) => (
          <li className="py-2" key={experience.id}>
            <ExperienceItem {...experience} />
          </li>
        ))}
    </ul>
  );
}

export default async function ExperienceList() {
  const url = getEnv("SUPABASE_URL");
  const apiKey = getEnv("SUPABASE_API_KEY");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      apikey: apiKey,
    },
    cache: "force-cache",
  });

  const items = await response
    .json()
    .then((experiences: RawExperienceItemProps[]) =>
      experiences.map((experience) => {
        const cleaned_experience: ExperienceItemProps = {
          ...experience,
          start_date: new Date(experience.start_date),
          end_date:
            experience.end_date == undefined
              ? undefined
              : new Date(experience.end_date),
        };
        return cleaned_experience;
      })
    );

  return <ExperienceListView experiences={items} />;
}
