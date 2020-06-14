const parseCookies = (req, res, next) => {
  var cookieString = req.get("Cookie") || ""; // or simply req.headers.cookie
  var parsedCookies = {};
  if (cookieString.length) {
    var cookiesArray = cookieString.split("; ");

    cookiesArray.forEach((cookie) => {
      if (cookie.length) {
        var tmp = cookie.split("=");
        var key = tmp[0];
        var value = tmp[1];
        parsedCookies[key] = value;
      }
    });
  }
  req.cookies = parsedCookies;
  next();
};

module.exports = parseCookies;
