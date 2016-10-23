[![Build Status](https://img.shields.io/travis/dave-irvine/node-sqlschemify.svg)](https://travis-ci.org/dave-irvine/node-sqlschemify)
[![NPM version](https://img.shields.io/npm/v/sqlschemify.svg)](https://www.npmjs.com/package/sqlschemify)

sqlschemify
====

Produce [Sequelize](http://sequelizejs.com) models from [JSON Schemas](http://json-schema.org).


#### Installation

    npm install sqlschemify
    
#### Requirements

 - SequelizeJS

#### Usage

    var Sequelize = require('sequelize'),
        SQLSchemify = require('sqlschemify');
       
    var schemify = SQLSchemify({
        Sequelize: Sequelize
    });
    
    var model = schemify.getModelForSchema('path/to/schema');

#### API

###### getModelForSchema(Object schema | String path) : Object model

Pass either a parsed JSON Schema, or a path to a JSON Schema file.

Returns a Sequelize Model.
