const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AdminDoc } = require("../../schema");
const validateAuth = require("../../validation/authenticate");

Router.get("/", (req, res, next) => {
  const errors = validateAuth(req.query);
  if (Object.keys(errors).length > 0) return res.send({ err: errors });

  const { email, password } = req.query;
  AdminDoc.findOne({ email })
    .then((admin) => {
      if (!admin)
        return res.send({
          err: { email: "Couldn't find your Admindash account" },
        });

      const result = bcrypt.compareSync(password, admin.password);
      if (!result) return res.send({ err: { password: "Incorrect password" } });
      delete admin.password;
      const token = jwt.sign(admin._doc, process.env.SALT);
      res.send({ token });
    })
    .catch(next);
});

module.exports = Router;
