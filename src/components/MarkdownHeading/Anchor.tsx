type Props = {
  title: string;
  activeId: string;
};

export default function Anchor({ title, activeId }: Props) {
  const [head, content] = title.replace(/#+/, (s) => `${s}//`).split('// ');
  const activeClassName = activeId === content ? 'font-semibold' : '';

  if (!head || !content) {
    return null;
  }

  switch (head) {
    case '#':
      return <H1Anchor title={content} className={activeClassName} />;
    case '##':
      return <H2Anchor title={content} className={activeClassName} />;
    case '###':
      return <H3Anchor title={content} className={activeClassName} />;
    default:
      return null;
  }
}

const commonClassName = 'relative hover:text-slate-400';

type AnchorProps = {
  title: string;
  className: string;
};

function H1Anchor({ title, className }: AnchorProps) {
  return (
    <li className={`p-[2px] pl-1 text-base ${commonClassName} ${className}`}>
      <a href={`#${title}`}>{title}</a>
    </li>
  );
}

function H2Anchor({ title, className }: AnchorProps) {
  return (
    <li className={`p-[2px] pl-3 text-sm ${commonClassName} ${className}`}>
      <a href={`#${title}`}>{title}</a>
    </li>
  );
}

function H3Anchor({ title, className }: AnchorProps) {
  return (
    <li className={`p-[2px] pl-6 text-xs ${commonClassName} ${className}`}>
      <a href={`#${title}`}>{title}</a>
    </li>
  );
}
