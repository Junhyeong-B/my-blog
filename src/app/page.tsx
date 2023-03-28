import PostList from '@/components/PostList';
import { getAllFilesFrontMatter } from '@/service/mdx';

export default function HomePage() {
  const files = getAllFilesFrontMatter('blog');
  return (
    <main className="mx-4 sm:mx-12">
      <PostList files={files} />
    </main>
  );
}
