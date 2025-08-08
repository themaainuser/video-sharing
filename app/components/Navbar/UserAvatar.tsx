import Image from "next/image";

interface Props {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}

export default function UserAvatar({ user }: Props) {
  const fallback = user?.name?.charAt(0) || user?.email?.charAt(0) || "U";

  return (
    <div className="flex items-center">
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name || "User"}
          width={32}
          height={32}
          className="mr-2 h-8 w-8 rounded-full"
        />
      ) : (
        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
          {fallback}
        </div>
      )}
      <span className="text-sm font-medium">{user?.name || user?.email}</span>
    </div>
  );
}
