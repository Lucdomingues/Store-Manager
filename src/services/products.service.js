const { productsModel } = require('../models/index');
const schema = require('./validations/validationsInputs');

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
  const validateResultRequired = schema.validationName(name);

  if (validateResultRequired.type) return validateResultRequired;

  await productsModel.insert(newProduct);
  const products = await productsModel.findAll();
  const ultimo = products[products.length - 1];

  return { type: null, message: ultimo };
 };
 
module.exports = {
  findAll,
  findById,
  insert,
};