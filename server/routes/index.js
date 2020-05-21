const Router = require("express").Router();
const jwt = require("jsonwebtoken");

Router.use("/register", require("./auth/register"));
Router.use("/login", require("./auth/login"));

// Token verification
Router.use((req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ msg: "Token not provided!" });

  jwt.verify(token, process.env.SALT, (err, admin) => {
    if (err)
      return res.status(500).send({ msg: "Failed to authenticate token." });

    req.adminid = admin._id;
    next();
  });
});

Router.use("/customer", require("./customer"));

module.exports = Router;
