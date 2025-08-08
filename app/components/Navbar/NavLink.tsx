import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  currentPath: string;
  onMouseEnter?: () => void;
}

export default function NavLink({
  href,
  children,
  currentPath,
  onMouseEnter,
}: Props) {
  const isActive = href === currentPath;

  return (
    <Link
      href={href}
      className={`${isActive ? "text-blue-600" : "text-black"} hover:text-blue-500`}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </Link>
  );
}
