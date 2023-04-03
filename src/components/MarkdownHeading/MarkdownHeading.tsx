'use client';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Anchor from './Anchor';
import { useState } from 'react';

export default function MarkdownHeading({ content }: { content: string }) {
  const [activeId, setActiveId] = useState('');
  const headers = content.match(/^(#+).*/gm);

  useIntersectionObserver(headers, setActiveId);

  return (
    <section className="right-0 hidden border-l-2 border-l-slate-300 xl:fixed  xl:right-8 xl:top-[50%] xl:block xl:translate-y-[-70%] 2xl:right-40">
      <ul className="relative flex flex-col">
        {headers?.map((header) => (
          <Anchor key={header} title={header} activeId={activeId} />
        ))}
      </ul>
    </section>
  );
}
