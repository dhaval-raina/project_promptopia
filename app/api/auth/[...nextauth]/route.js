import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_SECRETID,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const userSessions = await User.findOne({
          email:session.user.email,
      }) 
      session.user.id = userSessions._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // id user is already exist in database
        const userExists = await User.findOne({
          email: profile.email,
        });
  
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
  
        // create a new user account
        return true;
        // serveless -> lambda -> dynamic mongodb
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };
