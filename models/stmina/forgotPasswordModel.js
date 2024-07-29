'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let forgotPasswordsModels = connection.define("forgotPasswords", {
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
        otp: {
            type: Sequelize.DataTypes.INTEGER
        },
    }, {
        timestamps: true
    });

    return forgotPasswordsModels;
};