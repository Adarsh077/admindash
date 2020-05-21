const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  addresses: [String],
});

const AdminSchema = mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email is already registered"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  customers: [CustomerSchema],
});

module.exports = mongoose.model("admins", AdminSchema);
