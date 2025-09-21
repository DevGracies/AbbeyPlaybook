// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { config } from "../config/config";
// import { findOrCreateGoogleUser } from "../services/auth.service";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: config.oauth.googleClientID,
//       clientSecret: config.oauth.googleClientSecret,
//       callbackURL: "/api/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0].value!;
//         const fullName = profile.displayName;
//         const user = await findOrCreateGoogleUser(email, fullName);
//         done(null, user);
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user: any, done) => done(null, user));
