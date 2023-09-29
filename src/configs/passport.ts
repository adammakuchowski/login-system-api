import passport from 'passport'

import User from '../db/models/User'

passport.use(new BearerStrategy(
  (token: any, done: any) => {
    User.findOne({ token: token }, (err: any, user: any) => {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      return done(null, user, { scope: 'all' })
    })
  }
))

passport.use(new LocalStrategy(
  (username: string, password: string, done: any) => {
    User.findOne({ username: username }, (err: any, user: any) => {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      if (!user.verifyPassword(password)) { return done(null, false) }
      return done(null, user)
    })
  }
))
