'use strict';

const { Sequelize } = require('sequelize');

module.exports = function (connection) {
    let dailyEntries = connection.define("dailyEntries", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        count: { type: Sequelize.DataTypes.INTEGER },
        entry_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            
        },
        package_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'packages',
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
        oldCount: {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: null
        },
    }, {
        timestamps: true,
        indexes: [
            {
                name:"e_p_d_a_unique_key",
                unique: true,
                fields: ['entry_date', 'package_id', 'driver_id']
            }
        ]
    });

    return dailyEntries;
};