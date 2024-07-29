'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let driversDocument = connection.define("driversDocument", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        driver_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'drivers',
                key: 'id'
            },
            allowNull: false,
        },
        documentURL: { type: Sequelize.DataTypes.STRING }
    }, {
        timestamps: true
    });
    return driversDocument;
};