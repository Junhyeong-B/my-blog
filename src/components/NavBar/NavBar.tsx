import { getNavigationMenus } from '@/service/nav';
import Link from 'next/link';

export default async function NavBar() {
  const navs = await getNavigationMenus();
  return (
    <header className="flex flex-col items-center gap-3 px-2 py-2 sm:flex-row sm:justify-between sm:gap-0 sm:px-3 ">
      <Link className="text-lg font-bold" href="/">
        Junhyeong Blog
      </Link>
      <ul className="flex gap-2">
        {navs.map(({ name, url }) => (
          <li key={name}>
            <Link href={url}>{name}</Link>
          </li>
        ))}
        <li></li>
      </ul>
    </header>
  );
}
