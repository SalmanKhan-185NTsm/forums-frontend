import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";
export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      // Persist the GitHub username in the token right after sign in
      if (account && profile) {
        token.github_username = profile.login;
        token.display_name = profile.name;

        try {
          const response = await axios.post(
            `${process.env.BACKEND_URL}/register-user`,
            {
              userData: {
                username: profile.login,
                email: profile.email,
              },
              authData: {
                authProvidedBy: account.provider,
                token: account.access_token,
              },
            }
          );
          token.userId = response.data.data.id;
        } catch (error) {
          console.error("Error storing session info:", error);
        } finally {
          return token;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      // Send the username to the client
      session.user.username = token.github_username;
      session.user.display_name = token.display_name;
      session.user.userId = token.userId;
      console.log(session);
      return session;
    },
  },
};
