const Router = require("express").Router();
const { AdminDoc } = require("../schema");
const validateCustomer = require("../validation/Customer");

/* Get Single Customer */
Router.get("/:customerid", (req, res, next) => {
  const { customerid } = req.params;

  AdminDoc.findOne(
    { _id: req.adminid, "customers._id": customerid },
    { "customers.$": 1 }
  )
    .then((admin) => res.send(admin))
    .catch(next);
});

/* Get All Customers */
Router.get("/", (req, res, next) => {
  AdminDoc.findById(req.adminid, {
    "customers.name": 1,
    "customers.age": 1,
    "customers.gender": 1,
  })
    .then((admin) => res.send(admin))
    .catch(next);
});

/* Add Customer */
Router.post("/", (req, res, next) => {
  const errors = validateCustomer(req.body);
  if (Object.keys(errors).length > 0) return res.send({ err: errors });

  AdminDoc.findByIdAndUpdate(
    req.adminid,
    { $push: { customers: req.body } },
    { new: true }
  )
    .then((admin) => res.send(admin))
    .catch(next);
});

/* Edit Customer */
Router.put("/:customerid", (req, res, next) => {
  const errors = validateCustomer(req.body);
  if (Object.keys(errors).length > 0) return res.send({ err: errors });

  const { customerid } = req.params;
  AdminDoc.findOneAndUpdate(
    { _id: req.adminid, "customers._id": customerid },
    { "customers.$": req.body },
    { new: true }
  )
    .then((admin) => res.send(admin))
    .catch(next);
});

/* Delete Customer */
Router.delete("/:customerid", (req, res, next) => {
  const { customerid } = req.params;

  AdminDoc.findByIdAndUpdate(
    req.adminid,
    {
      $pull: { customers: { _id: customerid } },
    },
    { new: true }
  )
    .then((admin) => res.send(admin))
    .catch(next);
});

module.exports = Router;
