import { trpc } from "../../utils/trpc";
import { Post } from "./Post";

export const Feed = () => {
  const { data: posts } = trpc.post.feed.useQuery();

  if (!posts) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <Post
          key={post.id}
          authorUsername={post.author.username}
          caption={post.caption}
          comments={post.comments.map((comment) => ({
            id: comment.id,
            authorUsername: comment.author.username,
            text: comment.text,
          }))}
          images={post.images}
          avatarUrl={post.author.avatarUrl}
        />
      ))}
    </div>
  );
};
