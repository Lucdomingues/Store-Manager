const { productsServices } = require('../services/index');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productsServices.findAll();

  if (type) return res.status(500).json(message);

  return res.status(200).json(message);
};

const listProductsId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  return res.status(200).json(message);
};
 
const insertProducts = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsServices.insert({ name });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsServices.update(id, { name });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
 };
 
const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.delet(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).end();
};

module.exports = {
  listProducts,
  listProductsId,
  insertProducts,
  updateProducts,
  deleteProducts,
};