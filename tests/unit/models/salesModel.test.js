const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models/index');

const connection = require('../../../src/models/connection');
const { sales } = require('./mock/products.model.mock');

describe('Testa a unidade do model de sales', () => {
  it('Recuperando a lista de sales', async () => {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await salesModel.findAll();

    expect(result).to.be.deep.equal(sales);
  });

  it('Recuperando um sale pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([sales[0]]);

    const result = await salesModel.findById(1);

    expect(result).to.be.deep.equal(sales[0]);
  });

  afterEach(() => {
    sinon.restore();
  });
});

