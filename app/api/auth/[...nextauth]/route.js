import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_SECRETID,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          // Connect to the database
          await connectToDB();
          
          console.log('Credentials:', credentials);
      
          // Find the user by username (or email)
          const user = await User.findOne({ username: credentials.username });
          if (!user) {
            console.log('No user found');
            throw new Error("No user found with the provided username");
          }
      
          // Validate the password
          // const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          // if (!isPasswordValid) {
          //   console.log('Invalid password');
          //   throw new Error("Invalid password");
          // }
      
          // Return the user object if everything is fine
          console.log('User authenticated:', user);
          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.log('Authorization error:', error.message);
          return null;
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async session({ session }) {
      
      try {
        // Connect to the database
        await connectToDB();
        
        // Retrieve user details from the database
        const userSession = await User.findOne({
          email: session.user.email,
        });
        session.user.id = userSession._id.toString();
        return session;
      } catch (error) {
        console.log('Session callback error:', error.message);
        return session;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (account.provider !== 'google') {
        // Skip signIn logic for non-Google providers
        return true;
      }
      
      try {
        await connectToDB();
        
        // Log Google profile info
        console.log("Google profile info:", profile);
        
        // Check if the user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
  
        if (!userExists) {
          console.log("User does not exist, creating new user");
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        } else {
          console.log("User already exists:", userExists);
        }
  
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'Lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      },
    },
  },
});

export { handler as GET, handler as POST };
