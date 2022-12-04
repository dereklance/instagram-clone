import Image from "next/image";
import Link from "next/link";

export const Avatar = ({
  className,
  url,
  username,
}: {
  className?: string;
  url: string;
  username: string;
}) => {
  return (
    <Link className={`relative ${className}`} href={`/${username}`}>
      <Image
        src={url}
        alt="avatar"
        fill
        className="rounded-full object-cover"
      />
    </Link>
  );
};
