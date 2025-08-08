import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { signIn } from "next-auth/react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
type LoginFormProps = {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errorMessage?: string;
  className?: string;
};

export function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  errorMessage,
  className,
  ...props
}: LoginFormProps) {
  // const pathname = usePathname();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.04),0_2px_3px_rgba(0,0,0,0.04)]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  {/* Github sigin button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => signIn("github")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Github
                  </Button>
                  {/* Google sigin button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => signIn("google")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </div>
                <div className="text-muted-foreground relative flex items-center text-sm">
                  <div className="border-border flex-grow border-t" />
                  <span className="bg-card z-10 px-2">Or continue with</span>
                  <div className="border-border flex-grow border-t" />
                </div>
                {/* Show error */}
                {errorMessage && (
                  <div className="mb-1 text-lg font-bold text-red-500">
                    {errorMessage}
                  </div>
                )}
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className="transition duration-500 focus:ring-1 focus:ring-neutral-700"
                      id="email"
                      type="email"
                      placeholder="me@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>

                      {/* TODO update this funcanility based on this article 👇 ↓ 
                    https://medium.com/@sumsourabh14/how-i-created-a-password-reset-flow-in-next-js-012490edb801 */}
                      <a
                        href="/forgetpassword"
                        className="ml-auto text-sm underline underline-offset-4 hover:text-gray-600"
                      >
                        Forgot your password?
                        {/* <Link
                          href="/forgetpassword"
                          className={`${pathname === "/forgetpassword" ? "text-blue-600" : "text-black"} hover:text-gray-500 ml-auto text-sm underline-offset-4 underline`}
                        >
                        </Link> */}
                      </a>
                    </div>
                    <Input
                      className="transition duration-500 focus:ring-1 focus:ring-neutral-700"
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className={cn("btn-link w-full text-lg")}
                  >
                    {/* <div className="w full absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-sky-600 to-transparent"></div> */}
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
