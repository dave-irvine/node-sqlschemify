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

    it('should throw an Error if no options are passed', () => {
        return expect(() => {
            let schemify = sqlschemify();
        }).to.throw('Required options object missing');
    });

    it('should throw an Error if no Sequelize module is passed', () => {
        return expect(() => {
            let schemify = sqlschemify({});
        }).to.throw('Sequelize is a required option');
    });

    it('should throw an Error if an incorrect Sequelize module is passed', () => {
        return expect(() => {
            let schemify = sqlschemify({
                Sequelize: true
            });
        }).to.throw('Sequelize module must be passed, not an Instance');
    });

    it('should return an instance of SQLSchemify when correct options are passed', () => {
        let schemify = sqlschemify({
            Sequelize: SequelizeMock
        });

        return expect(schemify).to.be.an.instanceOf(SQLSchemify);
    });
});