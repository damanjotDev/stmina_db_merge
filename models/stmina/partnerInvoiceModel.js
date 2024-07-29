'use strict';

const { Sequelize } = require('sequelize');
const { MONTHS, EXPENSE_CATEGORY , PARTNER_INVOICE_STATUS_TYPE} = require('../../utils/constants');

module.exports = function (connection) {
    let partner_invoice_model = connection.define("partner_invoices", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        data: {
            type: Sequelize.DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
        partner_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'partners',
                key: 'id'
            },
            allowNull: false,
        },
        total_amount: {
            type: Sequelize.DataTypes.DOUBLE,
            defaultValue: 0
        },
        status: {
            type: Sequelize.DataTypes.STRING,
            values: [...Object.values(PARTNER_INVOICE_STATUS_TYPE)],
            defaultValue: "active"
        }
    }, {
        timestamps: true
    });

    return partner_invoice_model;
};