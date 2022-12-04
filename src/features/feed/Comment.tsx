import { UserLink } from "./UserLink";

export const Comment = ({
  username,
  text,
}: {
  username: string;
  text: string;
}) => {
  return (
    <div>
      <UserLink username={username} /> <span>{text}</span>
    </div>
  );
};
