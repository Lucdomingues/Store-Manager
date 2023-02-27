const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [resultSales] = await connection.execute(
    `SELECT  p.sale_id, s.date, p.product_id, p.quantity 
    FROM StoreManager.sales s
    INNER JOIN StoreManager.sales_products p
    ON s.id = p.sale_id
    ORDER BY p.sale_id, p.product_id ;`,
  );

  return camelize(resultSales);
};

const findAllSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );

  return result;
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
    const [{ insertId }] = await connection.execute(
     'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [idSale, productId, quantity],
    );
  console.log('test', insertId);
};

module.exports = {
  findAll,
  findById,
  insertSaleId,
  insertProduct,
  findAllSales,
};