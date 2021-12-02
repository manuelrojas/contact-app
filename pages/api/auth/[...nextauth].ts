import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { NextApiRequest, NextApiResponse } from "next";

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/contacts.readonly'
];

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      scope: scopes.join(" "),
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        token.accessToken = account?.accessToken;
      }
      return token;
    },
  },
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)

