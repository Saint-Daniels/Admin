import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { googleConfig } from '../google/config';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
    }),
  ],
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST }; 