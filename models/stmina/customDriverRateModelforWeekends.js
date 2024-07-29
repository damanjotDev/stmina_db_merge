'use strict';

const { Sequelize } = require('sequelize');
const { WEEKENDS } = require('../../utils/constants');

module.exports = function (connection) {
    let custom_driver_rates_weekends = connection.define("custom_driver_rates_weekends", {
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
        saturday_customRate : {
            type: Sequelize.DataTypes.DOUBLE
        },
        sunday_customRate : {
            type: Sequelize.DataTypes.DOUBLE
        }
    }, {
        timestamps: true
    });

    return custom_driver_rates_weekends;
};