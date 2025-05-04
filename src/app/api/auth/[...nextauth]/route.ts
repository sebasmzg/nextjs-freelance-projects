import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs";
import { UserService } from "infrastructure/services/user.service";
import { Session, User, AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthToken {
    id?: string;
    name?: string;
    email?: string;
    token?: string;
}

interface AuthUser {
    id: string;
    name: string;
    email: string;
}

export interface CustomSession extends Session {
    user: {
        id?: string;
        name?: string;
        email?: string;
        token?: string;
    }
}

const userService = new UserService();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.password || !credentials?.email) {
          console.error("No credentials provided");
          return null;
        }
        try {
          const user = await userService.findUserByEmail(credentials.email);
          if (!user) {
            console.error("User not found");
            return null;
          }
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            console.error("Invalid password");
            return null;
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          } as AuthUser;
        } catch (e: unknown) {
          console.error("Error in authorize: ", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: {token: JWT, user?: User}) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
    async session({ session, token })  {
        const customSession = session as CustomSession;
        customSession.user.id = (token as AuthToken).id;
        customSession.user.name = (token as AuthToken).name;
        customSession.user.email = (token as AuthToken).email;
        customSession.user.token = (token as AuthToken).token;
        return customSession;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    }
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);