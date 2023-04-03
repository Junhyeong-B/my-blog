'use client';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Anchor from './Anchor';
import { useState } from 'react';

export default function MarkdownHeading({ content }: { content: string }) {
  const [activeId, setActiveId] = useState('');
  const headers = content.match(/^(#+).*/gm);

  useIntersectionObserver(headers, setActiveId);

  return (
    <section className="hidden border-l-2 border-l-slate-300 lg:fixed lg:top-[50%] lg:right-40 lg:block lg:translate-y-[-70%]">
      <ul className="relative flex flex-col">
        {headers?.map((header) => (
          <Anchor key={header} title={header} activeId={activeId} />
        ))}
      </ul>
    </section>
  );
}
