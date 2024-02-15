const passport = require("passport");
const Person = require("./models/Person");
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    // authentication logic
    try {
      //   console.log("Recived Credentials: ", USERNAME, password);

      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) return done(null, user);
      else return done(null, false, { message: "Incorrect Password" });
    } catch (err) {
      return done(err);
    }
  })
);
module.exports = passport;
