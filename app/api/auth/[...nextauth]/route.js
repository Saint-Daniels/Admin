import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const ALLOWED_EMAIL = 'hbm.wallet@gmail.com';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check if the credentials match exactly
        if (credentials?.email === ALLOWED_EMAIL && 
            credentials?.password === process.env.ADMIN_PASSWORD) {
          return {
            id: '1',
            email: ALLOWED_EMAIL,
            name: 'Admin User',
            role: 'admin'
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST }; 