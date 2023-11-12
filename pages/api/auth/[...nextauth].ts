import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { db } from "../../../lib/db";
import { validateUser } from "../../../lib/auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the input tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = await db.user.findUnique({
          where: { username: credentials.username },
        });

        if (user && validateUser(user, credentials.password)) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
        }
      }
    }),
    // You can add more providers here
  ],
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // If you want to use JWT for session, but still want to store account data in a database,
    // you can do so by not passing a `database` option. This is useful if you want to implement
    // your own database schema, or use an ORM, or something like Firebase.
    jwt: true,
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,

  callbacks: {
    async jwt(token, user) {
      // Add user role to the token right after signin
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session(session, token) {
      // Add role to the session object
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',  // Displays signin buttons
    signOut: '/auth/signout', // Displays form with sign out button
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // Used for check email message
    newUser: null // If set, new users will be directed here on first sign in
  },
};

export default NextAuth(authOptions);