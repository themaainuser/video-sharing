import NavLink from "./NavLink";

interface Props {
  pathname: string;
  isAuthenticated: boolean;
}

const links = [
  { href: "/", label: "Home", protected: false },
  { href: "/profile", label: "Profile", protected: true },
  { href: "/upload", label: "Upload", protected: true },
];

export default function NavigationLinks({ pathname, isAuthenticated }: Props) {
  return (
    <>
      {links.map((link) =>
        !link.protected || isAuthenticated ? (
          <NavLink key={link.href} href={link.href} currentPath={pathname}>
            {link.label}
          </NavLink>
        ) : null,
      )}
    </>
  );
}
