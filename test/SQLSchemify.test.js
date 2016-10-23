/*eslint-env mocha */
/*eslint-disable no-unused-expressions*/
'use strict';

import chai, {expect} from 'chai';

import SQLSchemify from '../src/SQLSchemify';

describe('SQLSchemify', () => {
    const fixturesPath = 'test/fixtures/';

    let SequelizeMock,
        schemify;

    before(() => {
        SequelizeMock = () => {};
        SequelizeMock.Instance = () => {};
        SequelizeMock.STRING = 'string';
        SequelizeMock.INTEGER = 'integer';
    });

    beforeEach(() => {
        schemify = new SQLSchemify({
           Sequelize: SequelizeMock
        });
    });

    describe('constructor', () => {
        it('should throw an Error if no options are passed', () => {
            return expect(() => {
                let schemify = new SQLSchemify();
            }).to.throw('Required options object missing');
        });

        it('should throw an Error if no Sequelize module is passed', () => {
            return expect(() => {
                let schemify = new SQLSchemify({});
            }).to.throw('Sequelize is a required option');
        });

        it('should throw an Error if an incorrect Sequelize module is passed', () => {
            return expect(() => {
                let schemify = new SQLSchemify({
                    Sequelize: true
                });
            }).to.throw('Sequelize module must be passed, not an Instance');
        });
    });

    describe('getModelForSchema', () => {
        it('should throw an Error if no Schema or path to Schema file is passed', () => {
            return expect(() => {
                schemify.getModelForSchema();
            }).to.throw('Schema object or path to Schema file must be passed');
        });

        it('should throw an Error if passed a path to Schema file that does not exist', () => {
            return expect(() => {
                schemify.getModelForSchema(`${fixturesPath}/doesNotExist.schema`);
            }).to.throw('Could not open file');
        });

        it('should throw an Error if passed a path to Schema file that cannot be parsed', () => {
            return expect(() => {
                schemify.getModelForSchema(`${fixturesPath}/unparseable.schema`);
            }).to.throw('Unable to parse schema as a JSON object');
        });

        it('should return an Object when given a valid Schema', () => {
            let model = schemify.getModelForSchema(`${fixturesPath}/simple.schema`);

            return expect(model).to.be.an('object');
        });

        it('should map a Schema integer type to a Sequelize integer', () => {
            let model = schemify.getModelForSchema(`${fixturesPath}/simple.schema`);

            return expect(model.id.type).to.equal(SequelizeMock.INTEGER);
        });

        it('should apply any Sequelize properties in the Schema to the Model', () => {
            let model = schemify.getModelForSchema(`${fixturesPath}/sequelizeProperties.schema`);

            return expect(model.id).to.contain.all.keys({ 'primaryKey': true, 'autoIncrement': true });
        });

        it('should mark any required Schema properties as not allowing null', () => {
            let model = schemify.getModelForSchema(`${fixturesPath}/requiredProperties.schema`);

            return expect(model.id).to.contain.all.keys({ 'allowNull': false });
        });
    });
});
