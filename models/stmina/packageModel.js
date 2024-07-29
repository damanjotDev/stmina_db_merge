'use strict';

const { Sequelize } = require('sequelize');
const { PACKAGE_TYPE, PACKAGE_CATEGORY, TYPE } = require('../../utils/constants');
module.exports = function (connection) {
    let packages = connection.define("packages", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ausPostRate: { type: Sequelize.DataTypes.DOUBLE, },
        ausPostRateFrom: {
            type: Sequelize.DataTypes.DATE
        },
        description: { type: Sequelize.DataTypes.STRING },
        driverRate: { type: Sequelize.DataTypes.DOUBLE, },
        driverRateFrom: {
            type: Sequelize.DataTypes.DATE
        },
        packageCategory: {
            type: Sequelize.DataTypes.BIGINT,
            values: [...Object.values(PACKAGE_CATEGORY)]
        },
        status: { 
            type: Sequelize.DataTypes.ENUM({
                values: [...Object.values(TYPE)]
                }),
            defaultValue: "active"
        },
        type: {
            // type: Sequelize.DataTypes.ENUM({
            //     values: [...Object.values(PACKAGE_TYPE)]
            //     })
            type: Sequelize.DataTypes.STRING
        },
        area_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'areas',
                key: 'id'
            },
            allowNull: false,
        }
    }, {
        timestamps: true,
        indexes: [
            { fields: ['type','area_id' ], unique: true }
        ]
    });
    return packages;
};