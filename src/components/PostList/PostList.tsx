import { FrontMatter } from '@/service/mdx';
import Card from './Card';

type Props = {
  files: Omit<FrontMatter, 'dir' | 'draft'>[];
};

export default function PostList({ files }: Props) {
  return (
    <section className="flex w-full flex-wrap justify-center gap-4">
      {files.map(({ date, imageUrl, summary, tags, title }) => (
        <Card
          key={title}
          date={date}
          imageUrl={imageUrl}
          summary={summary}
          tags={tags}
          title={title}
        />
      ))}
    </section>
  );
}
