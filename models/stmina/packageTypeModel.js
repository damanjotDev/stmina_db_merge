'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let packageTypes = connection.define("package_types", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: { type: Sequelize.DataTypes.STRING },
        description: { type: Sequelize.DataTypes.STRING }
    }, {
        timestamps: false
    });

    return packageTypes;
};