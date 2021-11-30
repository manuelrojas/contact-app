import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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

export default (req, res) => {
  console.log("sup")
  return NextAuth(req, res, options)
}
