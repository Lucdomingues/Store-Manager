const express = require('express');
const { salesController } = require('../controllers/index');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.listSalesId);
// router.post('/', salesController.insertSales);

module.exports = router;