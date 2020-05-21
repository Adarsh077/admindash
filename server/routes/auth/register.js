const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AdminDoc } = require("../../schema");
const validateAuth = require("../../validation/authenticate");

Router.post("/", (req, res, next) => {
  const errors = validateAuth(req.body);
  if (Object.keys(errors).length > 0) return res.send({ err: errors });

  req.body.password = bcrypt.hashSync(req.body.password, 10);

  AdminDoc.create(req.body)
    .then((admin) => {
      delete admin.password;
      const token = jwt.sign(admin._doc, process.env.SALT);
      res.send({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000)
        return res.send({ err: { email: "Email is already registered." } });
      next(err, req, res);
    });
});

module.exports = Router;
