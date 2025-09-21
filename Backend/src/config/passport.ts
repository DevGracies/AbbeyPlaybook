import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { pool } from "./database"; 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const result = await pool.query(
  `SELECT * FROM users WHERE google_id = $1 OR email = $2`,
  [profile.id, profile.emails?.[0]?.value]
);


        let user;
        let isNew = false;

        if (result.rows.length > 0) {
         
          user = result.rows[0];

           if (!user.google_id) {
    await pool.query(
      `UPDATE users SET google_id = $1 WHERE id = $2`,
      [profile.id, user.id]
    );
    user.google_id = profile.id;
  }
        } else {
         const email = profile.emails?.[0]?.value || `${profile.id}@googleuser.com`;

const insert = await pool.query(
  `INSERT INTO users ("fullName", email, google_id) VALUES ($1, $2, $3) RETURNING *`,
  [profile.displayName, email, profile.id]
);

          user = insert.rows[0];
          isNew = true;
        }

        (user as any).isNew = isNew;

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// serialize + deserialize
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  done(null, result.rows[0]);
});

export default passport;
