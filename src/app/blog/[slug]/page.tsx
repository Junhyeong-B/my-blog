import MarkdownHeading from '@/components/MarkdownHeading';
import MarkdownViewer from '@/components/MarkdownViewer';
import { getBlogContentBySlug } from '@/service/files';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BiCalendar } from 'react-icons/bi';

type Props = {
  params: {
    slug: string;
  };
};

export default function BlogDetailPage({ params: { slug } }: Props) {
  const post = getBlogContentBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="mx-auto w-[85ch]">
      <article className="m-4 overflow-hidden">
        <section className="flex flex-col">
          <div className="flex items-center justify-end gap-1">
            <BiCalendar />
            <p className="font-semibold">{post.post.date}</p>
          </div>
          <h1 className="mb-4 rounded-md bg-slate-100 p-6 text-4xl font-bold shadow-sm">
            {post.post.title}
          </h1>
          <MarkdownViewer content={post.post.content} />
        </section>
        <section>
          <MarkdownHeading content={post.post.content} />
        </section>
      </article>
      <footer className="m-4 grid grid-cols-2 justify-between gap-1">
        {post.prev && (
          <Link
            href={`/blog/${post.prev.slug}`}
            className="rounded-md border border-slate-400 p-4"
          >
            <h5>이전 포스트</h5>
            <p className="font-semibold">{post.prev.title}</p>
          </Link>
        )}
        {post.next && (
          <Link
            href={`/blog/${post.next.slug}`}
            className="col-start-2 rounded-md border border-slate-400 p-4"
          >
            <h5>다음 포스트</h5>
            <p className="font-semibold">{post.next.title}</p>
          </Link>
        )}
      </footer>
    </section>
  );
}
