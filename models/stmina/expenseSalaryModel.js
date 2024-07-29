'use strict';

const { Sequelize } = require('sequelize');
const { MONTHS } = require('../../utils/constants');

module.exports = function (connection) {
    let expense_salary_model = connection.define("expense_salary", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        month: {
            type: Sequelize.DataTypes.ENUM,
            values: [...Object.values(MONTHS)]
        },
        start_date: {
            type: Sequelize.DataTypes.DATE
        },
        finish_date: {
            type: Sequelize.DataTypes.DATE
        },
        area_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'areas',
                key: 'id'
            },
            allowNull: false,
        },
        driver_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'drivers',
                key: 'id'
            },
            allowNull: false,
        },
        amount: {
            type: Sequelize.DataTypes.DOUBLE,
            defaultValue: 0
        },
        status: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "new"
        },
        description: {
            type: Sequelize.DataTypes.STRING
        }
    }, {
        timestamps: true
    });

    return expense_salary_model;
};