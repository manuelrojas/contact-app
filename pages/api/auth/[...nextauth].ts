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
    async jwt(account, token) {
      console.log("callback", JSON.stringify(account, null, 2))
      console.log("callback2", JSON.stringify(token, null, 2))

      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
}

export default (req, res) => {
  console.log("sup")
  return NextAuth(req, res, options)
}
