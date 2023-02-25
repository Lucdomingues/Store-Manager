const { expect } = require('chai');
const sinon = require('sinon');
const { salesServices } = require('../../../src/services/index');
const { salesModel } = require('../../../src/models/index');

const { sales, saleId } = require('./mock/products.services.mock');

describe('Testa a unidade do service de sales', () => {
  it('Recuperando a lista de sales', async () => {
    sinon.stub(salesModel, 'findAll').resolves(sales);

    const result = await salesServices.findAll();

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.deep.equal(sales);
  });

  it('Recuperando sales pelo id', async () => {
    sinon.stub(salesModel, 'findById').resolves(saleId[0]);

    const result = await salesServices.findById(1);

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.deep.equal(saleId[0]);
  });

  afterEach(() => {
    sinon.restore();
  });
});
