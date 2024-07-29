'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let rates = connection.define("rates", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        effectiveDate : {
            type: Sequelize.DataTypes.DATE,
            allowNull:false,
            validate: {
                notNull: { msg: "effectiveDate is required" },
            }
        },
        effectiveRate : {
            type: Sequelize.DataTypes.DOUBLE,
            default: 0,
        },
        newStatus: { type: Sequelize.DataTypes.STRING },
        oldDate : {
            type: Sequelize.DataTypes.DATE
        },
        oldRate: {type: Sequelize.DataTypes.DOUBLE,},
        oldStatus: { type: Sequelize.DataTypes.STRING },
        rateType: { type: Sequelize.DataTypes.INTEGER },
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
            }
        }
    }, {
        timestamps: true
    });

    return rates;
};