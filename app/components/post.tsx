export interface PostMetadata {
  title: string;
  date: Date;
  editDate?: Date;
  author: string;
  slug: string;
  keywords: string[];
  description: string;
}

interface PostHeaderProps {
  title: string;
  date: Date;
}

export default function PostHeader({ title, date }: PostHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className="text-4xl">{title}</h1>
      <h4 className="text-sm text-gray-500 dark:text-gray-400">
        {date.toLocaleDateString()}
      </h4>
    </div>
  );
}
