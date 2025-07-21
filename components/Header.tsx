"use client"
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); 

  console.log(`Header log of session: ${session} `)

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <header className="bg-[#242222] shadow-xl text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-bold">ImageKit</Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`${pathname === "/" ? "text-blue-600" : "text-white"} hover:text-blue-500`}>
            Home
          </Link>
          
          {/* Show these links only when user is logged in */}
          {status === "authenticated" && (
            <>
              <Link href="/dashboard" className={`${pathname === "/dashboard" ? "text-blue-600" : "text-white"} hover:text-blue-500`}>
                Dashboard
              </Link>
              <Link href="/profile" className={`${pathname === "/profile" ? "text-blue-600" : "text-white"} hover:text-blue-500`}>
                Profile
              </Link>
            </>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {status === "authenticated" ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {session.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                  </div>
                )}
                <span className="text-sm font-medium">
                  {session.user?.name || session.user?.email}
                </span>
              </div>
              <button 
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link 
                href="/login" 
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */} 
      {isMenuOpen && (
        <div className="md:hidden bg-[#242222]px-4 py-3 shadow-md">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className={`${pathname === "/" ? "text-blue-600" : "text-white"} hover:text-blue-500 py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Show these links only when user is logged in */}
            {status === "authenticated" && (
              <>
                <Link 
                  href="/dashboard" 
                  className={`${pathname === "/dashboard" ? "text-blue-600" : "text-white"} hover:text-blue-500 py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/profile" 
                  className={`${pathname === "/profile" ? "text-blue-600" : "text-white"} hover:text-blue-500 py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}

            {/* Auth Buttons for Mobile */}
            {status === "authenticated" ? (
              <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
                <div className="flex items-center">
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || "User"} 
                      className="w-8 h-8 rounded-full mr-2" 
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
                      {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                    </div>
                  )}
                  <span className="text-sm font-medium">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-sm font-medium text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
