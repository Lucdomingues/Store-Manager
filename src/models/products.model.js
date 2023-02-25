const camelize = require('camelize');
const connection = require('./db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return camelize(result);
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return camelize(result);
};

const insert = (newProducts) => connection.execute(
  'INSERT INTO StoreManager.products (name) VALUES (?);',
  [newProducts.name],
);

const update = (id, updateProducts) => connection.execute(
  `UPDATE StoreManager.products
   SET name = ?
   WHERE id = ?;`,
  [updateProducts, id],
);

const delet = (id) => connection.execute(
  'DELETE FROM StoreManager.products WHERE id = ?;',
  [id],
);

module.exports = {
  findAll,
  findById,
  insert,
  update,
  delet,
};