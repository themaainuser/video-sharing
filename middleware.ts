import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
        console.log(req.nextauth.token);
    },
    {
        callbacks: {
            authorized({ token, req }) {
                const { pathname } = req.nextUrl;
                if (
                    pathname.startsWith("/api/auth") ||
                    pathname === "/login" ||
                    pathname === "/register" ||
                    pathname === "/"
                ) { return true; }
                if (pathname === "/" || pathname === "/api/videos") {
                    return true;
                }
                console.log(`middleware log of token: ${token} `)
                return !!token;
            }
            // authorized({ req, token }) {
            //     console.log(req.nextUrl.pathname);
            //     if (req.nextUrl.pathname.startsWith("/admin")) {
            //         if (token?.userRole !== "admin") {
            //             return false;
            //         }
            //     }
            //     return true;
            // }
        }
    }
)