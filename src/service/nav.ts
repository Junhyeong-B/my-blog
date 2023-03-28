import path from 'path';
import { promises as fs } from 'fs';

export type NavBarItems = {
  name: string;
  url: string;
};

export async function getNavigationMenus(): Promise<NavBarItems[]> {
  const filepath = path.join(process.cwd(), 'data', 'nav', 'navs.json');
  const data = await fs.readFile(filepath, 'utf-8');
  return JSON.parse(data);
}
