import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log('Error checking if user exists: ', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

// import User from '@models/user';
// import { connectToDb } from '@utils/database';
// import NextAuth from 'next-auth/next';
// import GoogleProvider from 'next-auth/providers/google';
// import { signIn } from 'next-auth/react';

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   async session({ session }) {
//     const sessionUser = await User.findOne({
//       email: session.user.email,
//     });

//     session.user.id = sessionUser._id.toString();

//     return session;
//   },
//   async signIn({ profile }) {
//     try {
//       await connectToDb();

//       //   Check if a user already exists
//       const userExist = await User.findOne({
//         email: profile.email,
//       });

//       //   If not, create the user and save it to the database
//       if (!userExist) {
//         await User.create({
//           email: profile.email,
//           username: profile.name.replace(' ', '').toLowerCase(),
//           image: profile.image,
//         });
//       }
//       return true;
//     } catch (error) {
//       console.log('Checking if user exist', error);
//       return false;
//     }
//   },
// });

// export { handler as GET, handler as POST };
