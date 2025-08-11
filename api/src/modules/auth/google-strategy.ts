import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AccountService } from "../account/service";
import { Provider } from "@prisma/client";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      const account = await AccountService.findOrCreate(
        profile.emails?.[0].value as string,
        Provider.GOOGLE,
        profile.id
      );
      done(null, account);
    }
  )
);
