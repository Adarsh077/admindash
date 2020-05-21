const validateAuth = (data) => {
  const errors = {};
  if (!data.email) errors.email = "Email is required.";
  if (!data.password) errors.password = "Password is requried.";
  return errors;
};

module.exports = validateAuth;
