'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let driver_areas = connection.define("driver_areas", {
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
        area_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'areas',
                key: 'id'
            },
            allowNull: false,
        },
    }, {
        timestamps: false
    });

    return driver_areas;
};