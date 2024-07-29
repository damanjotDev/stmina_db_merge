'use strict';

const { Sequelize } = require('sequelize');
// const { EXPENSE_CATEGORY } = require('../../utils/constants');

module.exports = function (connection) {
    let expenses = connection.define("expenses", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        amount: {
            type: Sequelize.DataTypes.DOUBLE,
            defaultValue: 0
        },
        status: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "active"
        },
        driver_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'drivers',
                key: 'id'
            },
            allowNull: false,
        },
        category: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'expense_categories',
                key: 'id'
            },
            allowNull: false,
        },
        // category: { 
        //     type: Sequelize.DataTypes.ENUM({
        //         values: [...Object.values(EXPENSE_CATEGORY)]
        //         }),
        //     allowNull: false,
        // },
        description: {
            type: Sequelize.DataTypes.STRING
        },
        date: {
            type: Sequelize.DataTypes.DATE
        },
        receiptDocuments: {
            type: Sequelize.STRING,
            get() {
                const value = this.getDataValue('receiptDocuments');
                return value ? value.split(',') : [];
            },
            set(val) {
                if (Array.isArray(val)) {
                    this.setDataValue('receiptDocuments', val.join(','));
                } else {
                    this.setDataValue('receiptDocuments', val);
                }
            },
          },
        // driver_id: { // 
        //     type: Sequelize.DataTypes.INTEGER,
        //     references: {
        //         model: 'drivers',
        //         key: 'id'
        //     },
        //     allowNull: false,
        //     unique:true
        // }
    }, {
        timestamps: true
    });

    return expenses;
};