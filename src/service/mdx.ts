import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export type FrontMatter = {
  date: string | null;
  dir: string;
  draft: boolean;
  imageUrl: string;
  summary: string;
  tags: string[];
  title: string;
};

const root = process.cwd();

export function getAllFiles(...folder: string[]): string[] {
  const filePath = path.join(root, 'data', ...folder);
  const results: string[] = [];
  const fileList = fs.readdirSync(filePath);

  fileList.forEach((file) => {
    const currentFilePath = path.join(filePath, file);
    const stat = fs.statSync(currentFilePath);

    if (stat.isDirectory()) {
      const innerFileList = getAllFiles(...folder, file);
      results.push(...innerFileList);
    } else {
      results.push(currentFilePath);
    }
  });

  return results;
}

export function getMarkdownContent(dir: string) {
  const source = fs.readFileSync(dir, 'utf-8');
  const { content } = matter(source);
  return content;
}

export function getAllFilesFrontMatter(...folder: string[]): FrontMatter[] {
  const files = getAllFiles(...folder).filter((dir) => /\.(md|mdx)$/.test(dir));

  const allFrontMatters: FrontMatter[] = [];
  files.forEach((dir) => {
    const source = fs.readFileSync(dir, 'utf-8');
    const { data: frontMatter } = matter(source);

    if (!frontMatter.draft) {
      allFrontMatters.push({
        ...frontMatter,
        dir,
        date: dayjs(frontMatter.date).format('MMMM D, YYYY'),
      } as FrontMatter);
    }
  });

  return allFrontMatters;
}
