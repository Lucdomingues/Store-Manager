const { salesModel } = require('../models/index');

const validateProductId = async (req, res, next) => {
  const sales = req.body;
  const allSales = await salesModel.findAllSales();

  if (!sales.every((s) => 'productId' in s)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!(sales.every((s) => allSales.map((sa) => sa.product_id).includes(s.productId)))) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const validateQuantity = async (req, res, next) => {
  const sales = req.body;

  if (!sales.every((s) => 'quantity' in s)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (sales.some((s) => s.quantity === 0 || s.quantity < 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateProductId,
  validateQuantity,
};