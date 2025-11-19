"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import NavigationLinks from "./NavigationLinks";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";
import { Container } from "../container";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

export default function Header({ className }: { className?: string }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <Container className="fixed inset-x-0 top-0 z-10">
      {/* <header
        className={`fixed inset-x-0 top-0 z-50 bg-white shadow-sm ${className}`}
      > */}
      <motion.div
        animate={{
          boxShadow: scrolled ? "var(--shadow-aceternity)" : "none",
          width: scrolled ? "60%" : "100%",
          // y: scrolled ? 10 : 0, // Gives Padding in Y
        }}
        transition={{
          duration: 0.3,
          // ease: "anticipate",
          ease: "easeInOut",
        }}
        className="container mx-auto flex items-center justify-between rounded-2xl bg-white/30 px-4 py-2 backdrop-blur-xs"
      >
        <Link href="/" className="text-xl font-bold">
          ImageKit
        </Link>

        {session?.user.email && (
          <nav className="hidden items-center space-x-6 md:flex">
            <NavigationLinks
              pathname={pathname}
              isAuthenticated={status === "authenticated"}
            />
          </nav>
        )}

        <div className="hidden items-center space-x-4 md:flex">
          <AuthButtons
            status={status}
            session={session}
            onSignOut={handleSignOut}
          />
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </motion.div>
      {/* </header> */}

      {isMenuOpen && (
        <MobileMenu
          pathname={pathname}
          isAuthenticated={status === "authenticated"}
          session={session}
          onSignOut={handleSignOut}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </Container>
  );
}
