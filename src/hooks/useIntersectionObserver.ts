'use client';

import useOnMount from './useOnMount';

export default function useIntersectionObserver(
  headers: RegExpMatchArray | null,
  setActiveId: React.Dispatch<React.SetStateAction<string>>
) {
  const headerTitles = (headers ?? []).map((header) =>
    header.replace(/#+/, (s) => `${s}//`).split('// ')
  );

  useOnMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -98%',
      }
    );

    headerTitles.forEach(([_, id]) => {
      const element = document.getElementById(id);
      if (!element) {
        return;
      }

      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  });
}
