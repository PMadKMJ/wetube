import passport from "passport";
import routes from "../routes";
import User from "../model/User";

// globalRouter
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  console.log(res);
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    // go back to join
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  // User.findOrCreate({ githubId: profile.id }, function(err, user) {
  //   return cb(err, user);
  // });
  console.log(accessToken, refreshToken, profile, cb);
};

export const postGithubLogin = (req, res) => {
  res.send(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// userRouter

export const user = (req, res) => res.render("user", { pageTitle: "User" });

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "UserDetail" });

export const userEditProfile = (req, res) =>
  res.render("userEditProfile", { pageTitle: "UserEditProfile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });
