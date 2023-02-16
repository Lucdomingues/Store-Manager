const { expect } = require('chai');
const sinon = require('sinon');
const { productsServices } = require('../../../src/services/index');
const { productsModel } = require('../../../src/models/index');

const { products } = require('./mock/products.services.mock');

describe('Testa a unidade do service de products', () => {
  it('Recuperando a lista de produtos', async () => {
    sinon.stub(productsModel, 'findAll').resolves(products);

    const result = await productsServices.findAll();

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.deep.equal(products);
  });

  it('Recuperando produtos pelo id', async () => {
    sinon.stub(productsModel, 'findById').resolves(products[0]);

    const result = await productsServices.findById(1);

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.deep.equal(products[0]);
  });

  afterEach(() => {
    sinon.restore();
  });
});

