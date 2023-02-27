const express = require('express');
const { salesController } = require('../controllers/index');
const { validateSales } = require('../middlewares/index');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.listSalesId);
router.post('/', validateSales.validateProductId,
  validateSales.validateQuantity, salesController.insertSales);

module.exports = router;