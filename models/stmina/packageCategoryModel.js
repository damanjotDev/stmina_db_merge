'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let packageCategory = connection.define("package_categories", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category: { type: Sequelize.DataTypes.STRING },
        description: { type: Sequelize.DataTypes.STRING }
    }, {
        timestamps: false
    });

    return packageCategory;
};