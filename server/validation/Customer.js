const validateCustomer = (data) => {
  const errors = {};
  if (!data.name) errors.name = "Name is required.";
  if (!data.age) errors.age = "Age is requried.";
  if (!data.gender) errors.gender = "Gender is requried.";
  return errors;
};

module.exports = validateCustomer;
