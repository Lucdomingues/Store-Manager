const { salesModel } = require('../models/index');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const insert = async (sales) => {
  const sale = await salesModel.insert(sales);
  
  return { type: null, message: sale };
};

module.exports = {
  findAll,
  insert,
};