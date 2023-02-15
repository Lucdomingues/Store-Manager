const express = require('express');
const { productsController } = require('../controllers/index');

const router = express.Router();

router.get('/', productsController.listPassengers);
router.get('/:id', productsController.listPassengersId);

module.exports = router;