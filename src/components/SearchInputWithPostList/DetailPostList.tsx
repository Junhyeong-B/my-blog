import { FrontMatter } from '@/service/files';
import Image from 'next/image';
import Badge from '../Badge';
import Link from 'next/link';

type Props = {
  posts: FrontMatter[];
};

export default function PostList({ posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <Link
          href={`/blog/${post.slug}`}
          key={post.title}
          className="flex flex-col justify-center rounded-md border-2 sm:flex-row"
        >
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={400}
              height={400}
              className="w-full sm:w-[160px] lg:w-[200px]"
            />
          )}
          <div className="flex grow flex-col justify-around gap-2 py-2 px-4 sm:justify-between">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <h1 className="text-sm font-bold lg:text-lg">{post.title}</h1>
              <p className="text-xs text-slate-500 lg:text-sm">{post.date}</p>
            </div>
            <p className="lg:text-md text-xs">{post.summary}</p>
            <div className="hidden gap-2 sm:flex">
              {post.tags.map((tag) => (
                <Badge key={tag} text={tag} />
              ))}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
