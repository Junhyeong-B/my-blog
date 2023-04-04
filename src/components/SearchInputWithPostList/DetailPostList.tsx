import { FrontMatter } from '@/service/files';

type Props = {
  posts: FrontMatter[];
};

export default function PostList({ posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <h1 key={post.title}>{post.title}</h1>
      ))}
    </>
  );
}
