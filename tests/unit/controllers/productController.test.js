const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsServices } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');
const { products, newProduct } = require('./mock/product.controller.mock');

describe('Testa a unidade do controller de products', function () {
    it('Listando as pessoas passageiras e recebendo status 200', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'findAll')
        .resolves({ type: null, message: products });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  
  it('Recuperando produtos pelo id e recebendo status 200', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsServices, 'findById')
      .resolves({ type: null, message: products[0] });

    await productsController.listProductsId(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it('Cadastrando um novo produto e recebendo status 201', async function () {
    const res = {};
    const req = {
      body: newProduct,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsServices, 'insert')
      .resolves({ type: null, message: newProduct });

    await productsController.insertProducts(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});