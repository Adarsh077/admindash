const Router = require("express").Router();
const { AdminDoc } = require("../schema");

Router.post("/:customerid", (req, res, next) => {
  const { customerid } = req.params;
  AdminDoc.findOneAndUpdate(
    { _id: req.adminid, "customers._id": customerid },
    { $push: { "customers.$.addresses": req.body.address } },
    { new: true }
  )
    .then((admin) => res.send(admin))
    .catch(next);
});

Router.put("/:customerid/", (req, res, next) => {
  const { customerid } = req.params;
  const { address } = req.body;

  AdminDoc.findOneAndUpdate(
    { _id: req.adminid, "customers._id": customerid },
    { $pull: { "customers.$.addresses": address } }
  )
    .then((admin) => res.send(admin))
    .catch(next);
});

module.exports = Router;
