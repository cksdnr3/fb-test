import NextAuth, { NextAuthOptions } from "next-auth";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  providers: [],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
    session({ session }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
