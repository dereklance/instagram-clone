import Link from "next/link";

export const UserLink = ({ username }: { username: string }) => {
  return (
    <Link href={`/${username}`} className="font-semibold">
      {username}
    </Link>
  );
};
