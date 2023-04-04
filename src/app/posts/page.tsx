import SearchInput from '@/components/SearchInputWithPostList/SearchInput';
import { getAllFileFrontMatters } from '@/service/files';

export default function PostsPage() {
  const files = getAllFileFrontMatters('blog');

  return (
    <main className="m-12">
      <h1 className="text-3xl font-bold">모든 포스트</h1>
      <SearchInput files={files} />
    </main>
  );
}
