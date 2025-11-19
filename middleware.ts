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
                    pathname === "/video" ||
                    pathname === "/"
                ) { return true; }
                if (pathname === "/" || pathname === "/api/videos") {
                    return true;
                }
                return !!token;
            }
        }
    }
)