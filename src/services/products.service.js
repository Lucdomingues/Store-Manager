const { productsModel } = require('../models/index');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const products = await productsModel.findById(id);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: products };
};
 
module.exports = {
  findAll,
  findById,
};