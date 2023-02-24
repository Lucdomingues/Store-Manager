const validationName = (name) => {
  if (!name) return { type: 'BAD_REQUEST', message: '"name" is required' };
  if (name.length < 5) {
    return {
      type: 'UNPROCESSABLE_ENTITY',
      message: '"name" length must be at least 5 characters long',
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validationName,
};