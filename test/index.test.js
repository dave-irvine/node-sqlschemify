/*eslint-env mocha */
/*eslint-disable no-unused-expressions*/
'use strict';

import chai, {expect} from 'chai';

import sqlschemify from '../src';
import SQLSchemify from '../src/SQLSchemify';

describe('sqlschemify', () => {
    let SequelizeMock;

    before(() => {
        SequelizeMock = () => {};
        SequelizeMock.Instance = () => {};
    });

    it('should export a function', () => {
        return expect(sqlschemify).to.be.a('function');
    });

    it('should return an instance of SQLSchemify when correct options are passed', () => {
        let schemify = sqlschemify({
            Sequelize: SequelizeMock
        });

        return expect(schemify).to.be.an.instanceOf(SQLSchemify);
    });
});