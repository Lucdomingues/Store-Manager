const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [resultSales] = await connection.execute(
    `SELECT s.date, p.sale_id, p.product_id, p.quantity 
    FROM StoreManager.sales s
    INNER JOIN StoreManager.sales_products p
    ON s.id = p.sale_id;`,
  );

  return camelize(resultSales);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, p.product_id, p.quantity 
    FROM StoreManager.sales s
    INNER JOIN StoreManager.sales_products p
    ON s.id = p.sale_id
    WHERE id = ?;`,
    [id],
  );
  return camelize(result);
};

const insertSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
 };

const insertProduct = async (idSale, productId, quantity) => {
     await connection.execute(
     'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
       [idSale, productId, quantity],
   );
};

module.exports = {
  findAll,
  findById,
  insertSaleId,
  insertProduct,
};