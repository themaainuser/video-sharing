"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}

export default function UserAvatar({ user }: Props) {
  const router = useRouter();
  const fallback = user?.name?.charAt(0) || user?.email?.charAt(0) || "U";
  const redirectProfile = () => {
    router.push("/profile");
  };

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
      <button
        className="cursor-pointer text-sm font-medium"
        onClick={redirectProfile}
      >
        {user?.name || user?.email}
      </button>
    </div>
  );
}
