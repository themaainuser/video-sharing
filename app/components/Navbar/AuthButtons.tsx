import Link from "next/link";
import UserAvatar from "./UserAvatar";

interface Props {
  status: "authenticated" | "unauthenticated" | "loading";
  session: any;
  onSignOut: () => void;
}

export default function AuthButtons({ status, session, onSignOut }: Props) {
  if (status === "authenticated") {
    return (
      <div className="flex items-center space-x-4">
        <UserAvatar user={session.user} />
        <button
          onClick={onSignOut}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
      >
        Sign In
      </Link>
      <Link
        href="/register"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Sign Up
      </Link>
    </>
  );
}
