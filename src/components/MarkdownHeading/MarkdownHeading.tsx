import Anchor from './Anchor';

export default function MarkdownHeading({ content }: { content: string }) {
  const headers = content.match(/^(#+).*/gm);
  return (
    <section className="hidden lg:fixed lg:top-[10%] lg:right-40 lg:block">
      <ul className="flex flex-col">
        {headers?.map((header) => (
          <Anchor key={header} title={header} />
        ))}
      </ul>
    </section>
  );
}
