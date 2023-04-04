import { FrontMatter } from '@/service/files';
import Link from 'next/link';

type Props = {
  posts: FrontMatter[];
  searchText: string;
};

export default function SearchResultPostList({ posts }: Props) {
  return (
    <ul className="animate-fadeIn absolute top-14 max-h-40 w-full overflow-y-auto border border-slate-600 bg-slate-100">
      {posts.map((post) => (
        <li className="cursor-pointer p-2 hover:bg-slate-300" key={post.title}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
