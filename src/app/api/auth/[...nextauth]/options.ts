import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Username:",
    //       type: "text",
    //       placeholder: "your-cool-username",
    //     },
    //     password: {
    //       label: "Password:",
    //       type: "password",
    //       placeholder: "your-awesome-password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     // This is where you need to retrieve user data
    //     // to verify with credentials
    //     // Docs: https://next-auth.js.org/configuration/providers/credentials
    //     const user = { id: "42", name: "Dave", password: "nextauth" };

    //     if (
    //       credentials?.username === user.name &&
    //       credentials?.password === user.password
    //     ) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // async signIn({ user, account, profile }) {
    //     // Custom sign-in logic
    //     console.log("User signed in:", user);
    //     console.log("Account details:", account);
    //     console.log("Profile information:", profile);
  
    //     // Make an API call to store the user session info in the database
    //     try {
    //       await axios.post(`${process.env.BACKEND_URL}/api/store-session`, {
    //         user,
    //         account,
    //         profile,
    //       });
    //       return true; // Allow sign-in
    //     } catch (error) {
    //       console.error("Error storing session info:", error);
    //       return false; // Deny sign-in if the API call fails
    //     }
    //   },
    //   async signOut({ token }) {
    //     // Custom sign-out logic
    //     console.log("User signed out:", token);
  
    //     // Perform any cleanup or logging here
  
    //     return true; // Return true to allow sign-out
    //   },
    async jwt({ token, user, account, profile }: any) {
      // Persist the GitHub username in the token right after sign in
      if (account && profile) {
        // console.log(profile);
        token.github_username = profile.login;
        token.display_name = profile.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Send the username to the client
      session.user.username = token.github_username;
      session.user.display_name = token.display_name;
      console.log(session);

      return session;
    },
  },
};
