import PostList from '@/components/PostList';
import { getAllFileFrontMatters } from '@/service/files';

export default function HomePage() {
  const files = getAllFileFrontMatters('blog');
  return (
    <main className="mx-4 sm:mx-12">
      <PostList files={files} />
    </main>
  );
}
