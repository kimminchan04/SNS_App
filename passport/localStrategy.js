const passport = require("passport");
const bcrypt = require("bcrypt");
const {Strategy: LocalStrategy} = require("passport-local");
const User = require("../models/user");
module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: false
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({where: {email}});
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, {message: "password is not same"});
                }
            } else {
                done(null, false, {message: "This user is not joined member"});
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};