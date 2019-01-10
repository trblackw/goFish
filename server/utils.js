const handleErrors = data => {
  if (!data) {
    return res.status(422).json({
      errors: {
        [data]: "is required"
      }
    });
  }
};

module.exports = handleErrors;
