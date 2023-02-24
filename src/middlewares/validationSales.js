const validationProductId = (sales) => {
  const validateProductId = sales.every((ele) => ele.productId);

  if (!validateProductId) {
    return { type: 'BAD_REQUEST', message: '"productId" is required' };
  }

  return { type: null, message: '' };
};

const validationQuantity = (sales) => {
  let isValid = true;

  const validateQuantity = sales.every((ele) => ele.quantity);

  sales.forEach((element) => {
    if (element.quantity <= 0) isValid = false;
  });

  if (!isValid) {
    return { type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }
  if (!validateQuantity) {
    return { type: 'BAD_REQUEST', message: '"quantity" is required' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validationProductId,
  validationQuantity,
};