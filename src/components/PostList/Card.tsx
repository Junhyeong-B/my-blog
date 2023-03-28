import Image from 'next/image';

type Props = {
  date: string | null;
  imageUrl: string;
  summary: string;
  tags: string[];
  title: string;
};

export default function Card({ date, imageUrl, summary, tags, title }: Props) {
  return (
    <section className="w-80 cursor-pointer overflow-hidden rounded-md border-neutral-700 shadow-md">
      <Image src={imageUrl} alt={title} width={400} height={400} />
      <div className="px-4 py-2 sm:px-6 sm:py-4">
        <div className="md:text-md mb-2 text-right text-sm text-stone-600">
          {date}
        </div>
        <section className="flex flex-col items-center gap-2">
          <h4 className="font-bold">{title}</h4>
          <p className="text-center text-xs text-stone-700 sm:text-sm">
            {summary}
          </p>
          <ul className="flex justify-center gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-green-200 px-[6px] text-xs text-gray-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
