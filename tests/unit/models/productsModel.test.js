const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models/index');

const connection = require('../../../src/models/connection');
const { products } = require('./mock/products.model.mock');

describe('Testa a unidade do model de products', () => {
  it('Recuperando a lista de produtos', async () => {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.findAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.findById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  afterEach(() => {
    sinon.restore();
  });
 });

