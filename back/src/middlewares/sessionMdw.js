import session from "express-session";

export const sessionMdw = session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: false, // en prod, on mettrait "true"
    maxAge: 60000,
  },
  resave: false,
  saveUninitialized: false,
});
