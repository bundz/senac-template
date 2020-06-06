const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req, { allowUnknown: true });

    if(error) {
      res.status(400);
      throw new Error('Validation Error');
    }

    return next();
  }

};

module.exports = validate;