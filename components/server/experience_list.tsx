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

interface ExperienceItemPositionProps {
  id: number;
  position_name: string;
  company_name: string;
  start_date: Date;
  end_date?: Date;
  city: string;
  state: string;
  current: boolean;
}

interface ExperienceItemProps {
  company_name: string;
  company_url?: string;
  start_date: Date;
  end_date?: Date;
  positions: ExperienceItemPositionProps[];
}

interface CompanyTitleProps {
  company_name: string;
  company_url?: string;
}

interface DateRangeViewProps {
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
      break;

    case "Illinois":
      abbreviatedState = "IL";
      break;

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

function minDate(date1: Date, date2: Date) {
  return dateComparator(date1, date2, true) <= 0 ? date1 : date2;
}

function maxDate(date1: Date, date2: Date) {
  return dateComparator(date1, date2, false) >= 0 ? date1 : date2;
}

function CompanyTitle({ company_name, company_url }: CompanyTitleProps) {
  return (
    <div className="font-bold">
      {company_url != undefined ? (
        <Link href={company_url} className="underline hover:text-blue-500">
          {company_name}
        </Link>
      ) : (
        <p>{company_name}</p>
      )}
    </div>
  );
}

function DateRangeView({ start_date, end_date }: DateRangeViewProps) {
  return (
    <div className="dark:text-gray-400 text-gray-500">
      {fmt_date(start_date)}
      {end_date != undefined ? ` - ${fmt_date(end_date)}` : " - Present"}
    </div>
  );
}

export function ExperienceItemPositionView({
  position_name,
  start_date,
  end_date,
  current,
}: ExperienceItemPositionProps) {
  return (
    <div className="flex flex-row justify-center">
      <div className="grid grid-cols-6 grid-rows-1 w-full">
        <div className="col-span-3">
          <h1 className="font-bold text-sm">
            {position_name}
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
              {current ? "Current" : ""}
            </span>
          </h1>
        </div>
        <div className="col-span-3 text-right">
          <div className="md:text-sm text-xs flex flex-row justify-end">
            <DateRangeView start_date={start_date} end_date={end_date} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceItem({
  company_name,
  company_url,
  start_date,
  end_date,
  positions,
}: ExperienceItemProps) {
  if (positions.length == 1) {
    const position = positions[0];
    return (
      <div className="flex flex-row justify-center">
        <div className="grid grid-cols-6 grid-rows-1 w-full">
          <div className="col-span-4">
            <h1 className="font-bold">
              {position.position_name}
              <span className="text-blue-400 dark:text-blue-500 ml-2">
                {position.current ? "(Current)" : ""}
              </span>
            </h1>
            <div className="dark:text-gray-400 text-gray-500 text-sm">
              <CompanyTitle
                company_name={company_name}
                company_url={company_url}
              />
            </div>
          </div>
          <div className="col-span-2 text-right">
            <DateRangeView start_date={start_date} end_date={end_date} />
            <p className="text-gray-500 dark:text-gray-400 md:text-sm text-xs">
              {fmt_location(position.city, position.state)}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between mb-1">
          <div>
            <CompanyTitle
              company_name={company_name}
              company_url={company_url}
            />
            <p className="text-gray-500 dark:text-gray-400">Multiple Roles</p>
          </div>
          <div>
            <DateRangeView start_date={start_date} end_date={end_date} />
            <p className="text-gray-500 dark:text-gray-400 md:text-sm text-xs text-right">
              {fmt_location(positions[0].city, positions[0].state)}
            </p>
          </div>
        </div>
        <ul className="ml-3">
          {positions
            .sort((a, b) => {
              const a_date = a.end_date == undefined ? new Date() : a.end_date;
              const b_date = b.end_date == undefined ? new Date() : b.end_date;
              return dateComparator(a_date, b_date, false);
            })
            .map((position) => (
              <li key={position.id} className="py-1 ml-2">
                <ExperienceItemPositionView {...position} />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

interface ExperienceListProps {
  experiences: ExperienceItemProps[];
}

export function ExperienceListView({ experiences }: ExperienceListProps) {
  return (
    <ul className="sm:max-w-xl max-w-sm relative border-l-2 border-blue-500">
      {experiences
        .sort((a, b) => {
          const a_date = a.end_date == undefined ? new Date() : a.end_date;
          const b_date = b.end_date == undefined ? new Date() : b.end_date;
          return dateComparator(a_date, b_date, false);
        })
        .map((experience) => (
          <li key={experience.company_name} className="my-2 ml-6">
            <div className="absolute w-2.5 h-2.5 dark:bg-blue-500 bg-blue-400 rounded-full mt-1.5 -left-1.5"></div>
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
    .then((experiences: RawExperienceItemProps[]) => {
      let companies = new Map<string, ExperienceItemProps>();
      for (const experience of experiences) {
        const position: ExperienceItemPositionProps = {
          ...experience,
          start_date: new Date(experience.start_date),
          end_date:
            experience.end_date == undefined
              ? undefined
              : new Date(experience.end_date),
        };

        const company = companies.get(experience.company_name);
        if (company === undefined) {
          const company: ExperienceItemProps = {
            company_name: experience.company_name,
            company_url: experience.company_url,
            start_date: position.start_date,
            end_date: position.end_date,
            positions: [position],
          };
          companies.set(experience.company_name, company);
        } else {
          company.start_date = minDate(company.start_date, position.start_date);
          if (position.end_date != undefined && company.end_date != undefined) {
            company.end_date = maxDate(company.end_date, position.end_date);
          } else if (position.end_date != undefined) {
            company.end_date = position.end_date;
          }
          company.positions.push(position);
        }
      }
      return Array.from(companies.values());
    });

  return <ExperienceListView experiences={items} />;
}
