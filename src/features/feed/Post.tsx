import Image from "next/image";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import { UserLink } from "./UserLink";

export const Post = ({
  authorUsername,
  images,
  caption,
  comments,
  avatarUrl,
}: {
  authorUsername: string;
  images: { id: string; url: string; width: number; height: number }[];
  caption: string;
  comments: { id: string; authorUsername: string; text: string }[];
  avatarUrl: string;
}) => {
  return (
    <div className="w-fit rounded-md border border-black/10 bg-white">
      <div className="m-4 flex items-center gap-4 text-lg font-semibold">
        <Avatar url={avatarUrl} username={authorUsername} className="h-8 w-8" />
        <UserLink username={authorUsername} />
      </div>

      {images.map((image) => (
        <div
          key={image.id}
          className="relative aspect-square w-[470px] bg-black"
        >
          <Image src={image.url} alt="" fill className="object-contain" />
        </div>
      ))}

      <div className="m-4">
        <Comment username={authorUsername} text={caption} />

        {comments.map((comment) => (
          <Comment
            username={comment.authorUsername}
            text={comment.text}
            key={comment.id}
          />
        ))}
      </div>
    </div>
  );
};
