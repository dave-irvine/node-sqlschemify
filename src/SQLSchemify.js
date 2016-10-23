import FS from 'fs';
import _ from 'lodash';

export default class SQLSchemify {
    constructor(opts) {
        if (!opts) {
            throw new Error('Required options object missing.');
        }

        if (!opts.Sequelize) {
            throw new Error('Sequelize is a required option.');
        }

        if (typeof opts.Sequelize !== 'function' && !opts.Sequelize.Instance) {
            throw new Error('Sequelize module must be passed, not an Instance.');
        }

        let Sequelize = opts.Sequelize;

        this.typeMappings = {
            'string': Sequelize.STRING,
            'integer': Sequelize.INTEGER
        };
    }

    getModelForSchema(schema) {
        if (!schema) {
            throw new Error('Schema object or path to Schema file must be passed');
        }

        if (typeof schema === 'string') {
            try {
                schema = FS.readFileSync(schema).toString();
            } catch (e) {
                throw new Error(`Could not open file at: ${schema}`);
            }

            try {
                schema = JSON.parse(schema);
            } catch (e) {
                throw new Error('Unable to parse schema as a JSON object');
            }
        }

        let properties = {};

        _.each(schema.properties, (property, propertyName) => {
            var sequelizeObject = {
                type: this.typeMappings[property.type]
            };

            _.each(property.sequelize, (sequelizePropertyValue, sequelizePropertyKey) => {
                sequelizeObject[sequelizePropertyKey] = sequelizePropertyValue;
            });

            properties[propertyName] = sequelizeObject;
        });

        _.each(schema.required || [], (requiredProperty) => {
            properties[requiredProperty].allowNull = false;
        });

        return properties;
    }
}
