// "use client";
// import { useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import Image from "next/image";
// import GitHubButton from "./githubbutton";

// export default function Header({ className }: { className?: string }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleSignOut = async () => {
//     await signOut({ redirect: false });
//     router.push("/login");
//   };

//   return (
//     <>
//       <div className="fixed inset-x-0 top-0 container mx-auto flex items-center justify-between px-4 py-2">
//         {/* Logo/Brand */}
//         <Link href="/" className="text-xl font-bold">
//           ImageKit
//         </Link>

//         {/* Navigation */}
//         <nav className="hidden items-center space-x-6 md:flex">
//           <Link
//             href="/"
//             className={`${pathname === "/" ? "text-blue-600" : "text-black"} hover:text-blue-500`}
//           >
//             Home
//           </Link>

//           {/* Show these links only when user is logged in */}
//           {status === "authenticated" && (
//             <>
//               <Link
//                 href="/dashboard"
//                 className={`${pathname === "/dashboard" ? "text-blue-600" : "text-black"} hover:text-blue-500`}
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 href="/profile"
//                 className={`${pathname === "/profile" ? "text-blue-600" : "text-black"} hover:text-blue-500`}
//               >
//                 Profile
//               </Link>
//               <Link
//                 href="/upload"
//                 className={`${pathname === "/upload" ? "text-blue-600" : "text-black"} hover:text-blue-500`}
//               >
//                 Upload
//               </Link>
//               {/* <GitHubButton /> */}
//             </>
//           )}
//         </nav>

//         {/* Auth Buttons */}
//         <div className="hidden items-center space-x-4 md:flex">
//           {status === "authenticated" ? (
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center">
//                 {session.user?.image ? (
//                   <Image
//                     src={session.user.image}
//                     alt={session.user.name || "User"}
//                     className="mr-2 h-8 w-8 rounded-full"
//                   ></Image>
//                 ) : (
//                   <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
//                     {session.user?.name?.charAt(0) ||
//                       session.user?.email?.charAt(0) ||
//                       "U"}
//                   </div>
//                 )}
//                 <span className="text-sm font-medium">
//                   {session.user?.name || session.user?.email}
//                 </span>
//               </div>
//               <button
//                 onClick={handleSignOut}
//                 className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
//               >
//                 Sign Out
//               </button>
//             </div>
//           ) : (
//             <>
//               <Link
//                 href="/login"
//                 className="rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 href="/register"
//                 className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//         {/* Mobile Menu Button */}
//         <button
//           className="text-black focus:outline-none md:hidden"
//           onClick={toggleMenu}
//         >
//           <svg
//             className="h-6 w-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {isMenuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>
//       </div>
//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="bg-[#242222]px-4 py-3 shadow-md md:hidden">
//           <div className="flex flex-col space-y-3">
//             <Link
//               href="/"
//               className={`${pathname === "/" ? "text-blue-600" : "text-white"} py-2 hover:text-blue-500`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>

//             {/* Show these links only when user is logged in */}
//             {status === "authenticated" && (
//               <>
//                 <Link
//                   href="/dashboard"
//                   className={`${pathname === "/dashboard" ? "text-blue-600" : "text-black"} py-2 hover:text-blue-500`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   href="/profile"
//                   className={`${pathname === "/profile" ? "text-blue-600" : "text-black"} py-2 hover:text-blue-500`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Profile
//                 </Link>
//                 <Link
//                   href="/upload"
//                   className={`${pathname === "/upload" ? "text-blue-600" : "text-black"} hover:text-blue-500`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Upload
//                 </Link>
//               </>
//             )}

//             {/* Auth Buttons for Mobile */}
//             {status === "authenticated" ? (
//               <div className="flex flex-col space-y-3 border-t border-gray-200 pt-3">
//                 <div className="flex items-center">
//                   {session.user?.image ? (
//                     <Image
//                       src={session.user.image}
//                       alt={session.user.name || "User"}
//                       className="mr-2 h-8 w-8 rounded-full"
//                     />
//                   ) : (
//                     <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
//                       {session.user?.name?.charAt(0) ||
//                         session.user?.email?.charAt(0) ||
//                         "U"}
//                     </div>
//                   )}
//                   <span className="text-sm font-medium">
//                     {session.user?.name || session.user?.email}
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleSignOut}
//                   className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
//                 >
//                   Sign Out
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-col space-y-3 border-t border-gray-200 pt-3">
//                 <Link
//                   href="/login"
//                   className="rounded-md border border-blue-600 px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
