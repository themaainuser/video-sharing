import Link from "next/link";
import NavigationLinks from "./NavigationLinks";
import AuthButtons from "./AuthButtons";
import UserAvatar from "./UserAvatar";

interface Props {
  pathname: string;
  isAuthenticated: boolean;
  session: any;
  onSignOut: () => void;
  onClose: () => void;
}

export default function MobileMenu({
  pathname,
  isAuthenticated,
  session,
  onSignOut,
  onClose,
}: Props) {
  return (
    <div className="bg-white px-4 py-3 shadow-md md:hidden">
      <div className="flex flex-col space-y-3">
        <NavigationLinks
          pathname={pathname}
          isAuthenticated={isAuthenticated}
        />

        <div className="space-y-3 border-t border-gray-200 pt-3">
          {isAuthenticated ? (
            <>
              <UserAvatar user={session.user} />
              <button
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={onClose}
                className="rounded-md border border-blue-600 px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
