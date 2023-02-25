const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesServices } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');
const { sales, saleId, newSale } = require('./mock/product.controller.mock');

describe('Testa a unidade do controller de sales', function () {
  it('Listando sales e recebendo status 200', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesServices, 'findAll')
      .resolves({ type: null, message: sales });

    await salesController.listSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales);
  });

  it('Recuperando sales pelo id e recebendo status 200', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesServices, 'findById')
      .resolves({ type: null, message: saleId[0] });

    await salesController.listSalesId(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleId[0]);
  });

  it('Cadastrando uma nova sale e recebendo status 201', async function () {
    const res = {};
    const req = {
      body: [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ],
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesServices, 'insert')
      .resolves({ type: null, message: newSale });

    await salesController.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSale);
  });

  afterEach(function () {
    sinon.restore();
  });
});