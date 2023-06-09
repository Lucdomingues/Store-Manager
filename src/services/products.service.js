const { productsModel } = require('../models/index');
const { validateProducts } = require('../middlewares/index');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const products = await productsModel.findById(id);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: products };
};

const insert = async (newProduct) => {
  const { name } = newProduct;
  const validateResultRequired = validateProducts.validationName(name);

  if (validateResultRequired.type) return validateResultRequired;

  await productsModel.insert(newProduct);
  const products = await productsModel.findAll();
  const ultimo = products[products.length - 1];

  return { type: null, message: ultimo };
};

const update = async (id, updateProducts) => {
  const { name } = updateProducts;
  const products = await productsModel.findById(id);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const validateResultRequired = validateProducts.validationName(name);

  if (validateResultRequired.type) return validateResultRequired;

  await productsModel.update(id, name);

  const productsAtualized = await productsModel.findById(id);

  return { type: null, message: productsAtualized };
};
 
const delet = async (id) => {
  const products = await productsModel.findById(id);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.delet(id);

  return { type: null, message: '' };
};
 
module.exports = {
  findAll,
  findById,
  insert,
  update,
  delet,
};