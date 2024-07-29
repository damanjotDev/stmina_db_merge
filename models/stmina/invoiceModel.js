'use strict';

const { Sequelize } = require('sequelize');
const { MONTHS, EXPENSE_CATEGORY } = require('../../utils/constants');

module.exports = function (connection) {
    let invoice_model = connection.define("invoices", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        invoice_date: {
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
        invoice_expense_category: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'expense_categories',
                key: 'id'
            },
            allowNull: false,
        },
        // expense_category: {
        //     type: Sequelize.DataTypes.ENUM,
        //     values: [...Object.values(EXPENSE_CATEGORY)]
        // },
        amount: {
            type: Sequelize.DataTypes.DOUBLE,
            defaultValue: 0
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
        timestamps: true
    });

    return invoice_model;
};