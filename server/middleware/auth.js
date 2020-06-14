const models = require("../models");
const Promise = require("bluebird");

module.exports.createSession = async (req, res, next) => {
  Promise.resolve(req.cookies.shortlyid)
    .then((hash) => {
      if (!hash) {
        throw hash;
      }
      return models.Sessions.get({ hash });
    })
    .then((session) => {
      if (!session) {
        throw session;
      }
      return session;
    })
    .catch(() => {
      return models.Sessions.create()
        .then((result) => {
          return models.Sessions.get({ id: result.insertId });
        })
        .then((session) => {
          res.cookie("shortlyid", session.hash);
          return session;
        });
    })
    .then((session) => {
      req.session = session;
      next();
    });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  if (!models.Sessions.isLoggedIn(req.session)) {
    res.redirect("/login");
  } else {
    next();
  }
};
