const { productsServices } = require('../services/index');
const errorMap = require('../utils/errorMap');

const listPassengers = async (_req, res) => {
  const { type, message } = await productsServices.findAll();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

const listPassengersId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  res.status(200).json(message);
 };

module.exports = {
  listPassengers,
  listPassengersId,
};