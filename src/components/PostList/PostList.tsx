import { FrontMatter } from '@/service/files';
import Card from './Card';
import Link from 'next/link';

type Props = {
  files: Omit<FrontMatter, 'dir' | 'draft'>[];
};

export default function PostList({ files }: Props) {
  return (
    <section className="flex w-full flex-wrap justify-center gap-4">
      {files.map(({ date, imageUrl, summary, tags, title, slug }) => (
        <Link href={`/blog/${slug}`} key={slug}>
          <Card
            date={date}
            imageUrl={imageUrl}
            summary={summary}
            tags={tags}
            title={title}
          />
        </Link>
      ))}
    </section>
  );
}
