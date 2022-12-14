import NextAuth from 'next-auth'
import BNetProvider from 'next-auth/providers/battlenet'

const clientId = process.env.BLIZZ_CLIENT_ID || ''
const clientSecret = process.env.BLIZZ_CLIENT_SECRET || ''

/*
interface BNetJWT {
  token: {
    name?: string
    email?: string
    picture?: string
    sub?: string
  }
  user: {
    id: string
    name: string
    email?: string
    image?: string
  }
  account: {
    provider: string
    type: string
    providerAccountId: string
    access_token: string
    token_type: string
    expires_at: number
    scope: string
    sub: string
    id_token: string
  }
  profile: {
    at_hash: string
    sub: string
    aud: string
    azp: string
    iss: string
    exp: number
    iat: number
    battle_tag: string
    jti: string
  }
  isNewUser?: boolean
}

interface BNetSession {
  session: {
    user: { name?: string; email?: string; image?: string; }
    expires: string
  }
  token?: string
}
*/

export const authOptions = {
  providers: [
    BNetProvider({
      clientId,
      clientSecret,
      issuer: 'https://us.battle.net/oauth',
    }),
  ],
  callbacks: {
    // @ts-ignore
    async jwt({ token, account  }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    // @ts-ignore
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
    }
  },
}

// @ts-ignore
export default NextAuth(authOptions)
