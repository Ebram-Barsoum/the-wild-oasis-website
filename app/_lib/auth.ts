import NextAuth, { NextAuthConfig, Session } from 'next-auth';
import google from 'next-auth/providers/google';
import { NextRequest } from 'next/server';
import { createGuest, getGuest, User } from './services';

interface AuthorizedParams {
    auth: Session | null,
    request: NextRequest
}

const authConfig: NextAuthConfig = {
    providers: [
        google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    callbacks: {
        authorized({ auth, request }: AuthorizedParams) {
            return !!auth?.user;
        },
        async signIn({ user, account, profile }): Promise<boolean | string> {
            try {
                const guest: User | null = await getGuest(user?.email);

                if (!guest) {
                    const newGuest: Partial<User> = { email: user?.email || '', fullName: user?.name || '' };
                    await createGuest(newGuest);
                }

                return true;
            }
            catch (error) {
                return false;
            }
        },
        async session({ session, user }) {
            const guest = await getGuest(session.user.email);

            session.user.id = String(guest?.id);

            return session;
        }

    },
    pages: {
        signIn: '/login'
    }
};

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig);