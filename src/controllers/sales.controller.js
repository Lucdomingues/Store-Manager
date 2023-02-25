const { salesServices } = require('../services/index');
const errorMap = require('../utils/errorMap');

const listSales = async (_req, res) => {
  const { type, message } = await salesServices.findAll();

  if (type) return res.status(500).json(message);

  return res.status(200).json(message);
};

const listSalesId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

// const insertSales = async (req, res) => {
//   const sales = req.body;

//   const { type, message } = await salesServices.insert(sales);

//   if (type) return res.status(errorMap.mapError(type)).json({ message });

//   return res.status(201).json(message);
// };

module.exports = {
  listSales,
  listSalesId,
  // insertSales,
};