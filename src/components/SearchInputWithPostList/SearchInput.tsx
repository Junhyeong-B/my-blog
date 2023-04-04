'use client';

import { FrontMatter } from '@/service/files';
import { useEffect, useRef, useState } from 'react';
import DetailPostList from './DetailPostList';
import debounce from '@/utils/debounce';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchResultPostList from './SearchResultPostList';
import { useRouter } from 'next/navigation';

type Props = {
  files: FrontMatter[];
};

export default function SearchInput({ files }: Props) {
  const router = useRouter();

  const postsRef = useRef(files);
  const [searchText, setSearchText] = useState('');
  const [searchedPosts, setSearchedPosts] = useState<FrontMatter[]>([]);
  const [resultPosts, setResultPosts] = useState<FrontMatter[]>([]);

  const showResult = postsRef.current.length !== searchedPosts.length;

  useEffect(() => {
    setResultPosts(files);
  }, [files]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = debounce(
    (e) => {
      const value = e.target.value;
      if (!value) {
        setSearchedPosts([]);
        return;
      }

      const inputRegex = new RegExp(value, 'i');
      const filteredPosts = postsRef.current.filter((post) =>
        inputRegex.test(post.title)
      );

      setSearchedPosts(filteredPosts);
      setSearchText(value);
    },
    200
  );

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (searchedPosts.length === 0) {
      return;
    }

    if (searchedPosts.length === 1) {
      router.push(`/blog/${searchedPosts[0].slug}`);
      return;
    }

    if (searchedPosts.length > 1) {
      setResultPosts(searchedPosts);
      setSearchedPosts([]);
      setSearchText('');
    }
  };

  return (
    <main className="mt-4 mb-8">
      <form className="relative w-80" onSubmit={handleSubmit}>
        <input
          type="text"
          className="box-border w-full rounded-full border-2 border-slate-300 py-2 pr-16 pl-4 outline-none"
          placeholder="검색어를 입력해주세요."
          onChange={handleChange}
        />
        <button className="absolute right-0 rounded-full border-2 border-l-0 border-slate-300 bg-slate-800 py-2 px-4 text-slate-50 transition-colors hover:bg-slate-600">
          <AiOutlineSearch size="24px" />
        </button>
        {showResult && searchedPosts.length > 0 && (
          <SearchResultPostList posts={searchedPosts} searchText={searchText} />
        )}
      </form>
      <DetailPostList posts={resultPosts} />
    </main>
  );
}
