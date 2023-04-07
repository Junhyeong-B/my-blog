'use client';

import { useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

import { FrontMatter } from '@/service/files';
import debounce from '@/utils/debounce';
import DetailPostList from './DetailPostList';
import SearchResultPostList from './SearchResultPostList';
import useOnMount from '@/hooks/useOnMount';
import { useIsMedium } from '@/hooks/useScreenType';

type Props = {
  files: FrontMatter[];
};

export default function SearchInput({ files }: Props) {
  const router = useRouter();

  const postsRef = useRef(files);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState('');
  const [searchedPosts, setSearchedPosts] = useState<FrontMatter[]>([]);
  const [resultPosts, setResultPosts] = useState<FrontMatter[]>([]);
  const isMediumDevice = useIsMedium();

  useOnMount(() => {
    setResultPosts(files);
  });

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
      setResultPosts(postsRef.current);
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

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <section className="mt-4 mb-8 flex flex-col gap-12 lg:flex-row">
      <section className="flex justify-center gap-4 lg:block">
        <h1 className="mb-4 hidden text-3xl font-bold sm:block">모든 포스트</h1>
        <form className="relative w-80" onSubmit={handleSubmit}>
          <input
            type="text"
            className="box-border w-full rounded-full border-2 border-slate-300 py-2 pr-16 pl-4 outline-none"
            placeholder="검색어를 입력해주세요."
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="absolute right-0 rounded-full border-2 border-l-0 border-slate-300 bg-slate-800 py-2 px-4 text-slate-50 transition-colors hover:bg-slate-600">
            <AiOutlineSearch size="24px" />
          </button>
          {!isMediumDevice && searchedPosts.length > 0 && (
            <SearchResultPostList
              posts={searchedPosts}
              searchText={searchText}
            />
          )}
        </form>
      </section>
      <section className="grow space-y-5">
        <DetailPostList posts={resultPosts} />
      </section>
    </section>
  );
}
