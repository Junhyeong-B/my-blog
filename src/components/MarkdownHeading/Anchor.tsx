type Props = {
  title: string;
};

export default function Anchor({ title }: Props) {
  const [head, content] = title.replace(/#+/, (s) => `${s}//`).split('// ');

  if (!head || !content) {
    return null;
  }

  switch (head) {
    case '#':
      return <H1 title={content} />;
    case '##':
      return <H2 title={content} />;
    case '###':
      return <H3 title={content} />;
    default:
      return null;
  }
}

function H1({ title }: Props) {
  return (
    <a href={`#${title}`} className="text-base transition hover:text-slate-400">
      {title}
    </a>
  );
}

function H2({ title }: Props) {
  return (
    <a
      href={`#${title}`}
      className="translate-x-3 text-sm transition hover:text-slate-400"
    >
      {title}
    </a>
  );
}

function H3({ title }: Props) {
  return (
    <a
      href={`#${title}`}
      className="translate-x-6 text-xs transition hover:text-slate-400"
    >
      {title}
    </a>
  );
}
