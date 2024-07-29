'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let areas = connection.define("areas", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        areaName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        description: { type: Sequelize.DataTypes.STRING, allowNull: false }
    }, {
        timestamps: true,
        indexes: [
            { fields: ['areaName'], unique: true }
          ]
    });

    return areas;
};