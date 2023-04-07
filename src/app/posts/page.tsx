import SearchInputWithPostList from '@/components/SearchInputWithPostList';
import { getAllFileFrontMatters } from '@/service/files';

export default function PostsPage() {
  const files = getAllFileFrontMatters('blog');

  return (
    <main className="m-12">
      <SearchInputWithPostList files={files} />
    </main>
  );
}
