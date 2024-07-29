'use strict';

const { Sequelize } = require('sequelize');
const { MONTHS, EXPENSE_CATEGORY, PARTNER_TYPE } = require('../../utils/constants');

module.exports = function (connection) {
    let partners = connection.define("partners", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataTypes.STRING
        },
        abn: {
            type: Sequelize.DataTypes.BIGINT,
        },
        address: {
            type: Sequelize.DataTypes.STRING
        },
        partner_logo: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: null
        },
        contractor_name: {
            type: Sequelize.DataTypes.STRING,
        },
        contractor_logo: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: null
        },
        contractor_no: {
            type: Sequelize.DataTypes.BIGINT,
        },
        contractor_abn: {
            type: Sequelize.DataTypes.BIGINT,
        },
        contractor_address: {
            type: Sequelize.DataTypes.STRING
        },
        status: {
            type: Sequelize.DataTypes.ENUM('active', 'inactive'),
            defaultValue: "active"
        },
    }, {
        timestamps: true
    });

    return partners;
};