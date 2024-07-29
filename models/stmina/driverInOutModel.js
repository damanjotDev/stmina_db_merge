'use strict';

const { Sequelize } = require('sequelize');
const { MONTHS, EXPENSE_CATEGORY } = require('../../utils/constants');

module.exports = function (connection) {
    let driverInOutModel = connection.define("driver_in_out", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.DataTypes.DATE
        },
        log_in_time: {
            type: Sequelize.DataTypes.DATE
        },
        log_out_time: {
            type: Sequelize.DataTypes.DATE
        },
        driver_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'drivers',
                key: 'id'
            },
            allowNull: false,
        },
        in_area_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'areas',
                key: 'id'
            }
        },
        out_area_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'areas',
                key: 'id'
            }
        },
    },
    {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['driver_id', 'date']
            }
        ]
    }
    );
    return driverInOutModel;
};