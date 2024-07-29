'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let customDriverRates = connection.define("custom_driver_rates", {
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
            validate: {
                notNull: { msg: "Driver_id is required" },
            }
        },
        package_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'packages',
                key: 'id'
            },
            allowNull: false,
            validate: {
                notNull: { msg: "package_id is required" },
            }
        },
        customRate : {
            type: Sequelize.DataTypes.DOUBLE,
            default: 0,
        },
        effectiveDate : {
            type: Sequelize.DataTypes.DATE,
            allowNull:false,
            validate: {
                notNull: { msg: "effectiveDate is required" },
            }
        }
    }, {
        timestamps: true,
        indexes: [
            { fields: ['driver_id','package_id', 'effectiveDate' ], unique: true }
        ]
    });

    return customDriverRates;
};