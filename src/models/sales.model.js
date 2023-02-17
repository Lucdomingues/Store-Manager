const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales;',
  );

  return camelize(result);
};

const insert = async (sales) => {   
    await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
    );
  
  const listSales = await findAll();
  const { id } = listSales[listSales.length - 1];

  const sale = sales.map(async (element) => {
    const placeholders = Object.keys(element)
      .map((_key) => '?')
      .join(', ');
    
    const insertSale = await connection.execute(
      `INSERT INTO StoreManager.sales_products 
     (sale_id, product_id, quantity) VALUE (?, ${placeholders})`,
      [id, ...Object.values(element)],
    );
    return insertSale;
  });
  
  return { id, itemSold: sale };
};

module.exports = {
  findAll,
  insert,
};