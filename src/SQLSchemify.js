export default class SQLSchemify {
    constructor(opts) {
        if (!opts) {
            throw new Error('Required options object missing.');
        }

        if (!opts.Sequelize) {
            throw new Error('Sequelize is a required option');
        }

        if (typeof opts.Sequelize !== 'function' && !opts.Sequelize.Instance) {
            throw new Error('Sequelize module must be passed, not an Instance');
        }
    }
}
