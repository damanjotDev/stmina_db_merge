'use strict';

const { Sequelize } = require('sequelize');
const commonFunctions = require('../../utils/utils');

module.exports = function (connection) {
    let users = connection.define("users", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: { type: Sequelize.DataTypes.STRING },
        role: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
        // role: {
        //     type:   Sequelize.ENUM,
        //     values: [1,2,3]
        // },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            set(value) {
                this.setDataValue('password', commonFunctions.hashPassword(value));
            }
        },
        first_name:{ type: Sequelize.DataTypes.STRING },
        last_name : { type: Sequelize.DataTypes.STRING },
        phone_number: { type: Sequelize.DataTypes.STRING },
        dob: { type: Sequelize.DataTypes.DATE }
    }, {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ]
    });

    return users;
};