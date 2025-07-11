import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User";
import { connectDatabase } from "./db";
import bcrypt from "bcryptjs"


export const authOptions: NextAuthOptions = {
providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: { 
            email: {label: "Email", type: "string", placeholder: "Email" },
            password: {label: "Password", type: "password"}
        },
        async authorize(credentials, req){
            if (!credentials?.email || !credentials?.password) {
                throw new Error("Email and password are required")
            }
            try{
                await connectDatabase()
                const user = await User.findOne({
                    email: credentials.email
                })
                const userPassword = await User.find({email: credentials.email}).select("password");

                if (!user) {
                    throw new Error("No user found with this");
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    userPassword[0].password
                );
                if (!isValid){
                    throw new Error("Invalid Password")
                }
                return{
                    id: user._id.toString(),
                    email: user.email,
                }
            }
            catch(error){
                console.error("Error in authorization:", error);
                throw error

            }
        }
    }),
    GithubProvider({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  callbacks: {
    async jwt({ token, user }){
       if (user){
        token.id = user.id;
       }
        return token
    },
    async session({ session, token }){
        if (session.user){
            session.user.id = token.id as string;
        }
        return session;
    },
  },
  pages: {
    signIn:"/login",
    newUser: "/signup",
    error: "/login"
    // error: "/auth/error", 
  },
  session:{
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === "development",
};