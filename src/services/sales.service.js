const { salesModel } = require('../models/index');
const { validateSales } = require('../middlewares/index');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (idSale) => {
  const saleId = await salesModel.findById(idSale);
  if (saleId.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: saleId };
};

const insert = async (sales) => {
  const validateResultRequired = validateSales.validationProductId(sales);
  const validateResultQuantity = validateSales.validationQuantity(sales);
  
  if (validateResultRequired.type) return validateResultRequired;
  if (validateResultQuantity.type) return validateResultQuantity;

  const newIdSale = await salesModel.insertSaleId();

  await Promise.all(
    sales.map(async (element) => {
      await salesModel.insertProduct(newIdSale, element.productId, element.quantity);
    }),
  );

  const sale = {
    id: newIdSale,
    itemsSold: sales,
  };
  
  return { type: null, message: sale };
};

module.exports = {
  findAll,
  findById,
  insert,
};