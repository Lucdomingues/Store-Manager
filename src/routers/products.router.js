const express = require('express');
const { productsController } = require('../controllers/index');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.listProductsId);
router.post('/', productsController.insertProducts);

module.exports = router;