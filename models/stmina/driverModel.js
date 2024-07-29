'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { EMPLOYMENT_TYPE, TYPE, DRIVER_TYPE } = require('../../utils/constants');

module.exports = function (connection) {
    let drivers = connection.define("drivers", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.DataTypes.STRING
        },
        lastName: {
            type: Sequelize.DataTypes.STRING
        },
        status: {
            type: Sequelize.DataTypes.STRING,
            values: [...Object.values(TYPE)],
            defaultValue: "active"
        },
        tfn: {
            type: Sequelize.DataTypes.BIGINT,
        },
        homeNumber: {
            type: Sequelize.DataTypes.BIGINT,
        },
        abn: {
            type: Sequelize.DataTypes.BIGINT,
        },
        mobileNumber: {
            type: Sequelize.DataTypes.STRING,
        },
        registrationExpiryDate: {
            type: Sequelize.DataTypes.DATE
        },
        insuranceExpiryDate: {
            type: Sequelize.DataTypes.DATE
        },
        from: {
            type: Sequelize.DataTypes.DATE
        },
        carPlateRegistrationNumber: {
            type: Sequelize.DataTypes.STRING
        },
        employmentType: {
            type: Sequelize.DataTypes.ENUM({
            values: [...Object.values(EMPLOYMENT_TYPE)]
            })
        },
        insurancePolicyNumber: {
            type: Sequelize.DataTypes.STRING
        },
        scannerNumber: {
            type: Sequelize.DataTypes.STRING
        },
        scannerPassword: {
            type: Sequelize.DataTypes.STRING
        },
        scannerUserName: {
            type: Sequelize.DataTypes.STRING
        },
        wages: {
            type: Sequelize.DataTypes.DOUBLE
        },
        email: {
            type: Sequelize.DataTypes.STRING,

        },
        password: {
            type: Sequelize.DataTypes.STRING
        },
        geometry: {
            type: Sequelize.DataTypes.GEOMETRY('POINT')
        },
        locationTime: {
            type: Sequelize.DataTypes.DATE
        },
        driverType:{
            type: Sequelize.DataTypes.ENUM({
                values:[...Object.values(DRIVER_TYPE)]
            }),
            defaultValue: DRIVER_TYPE.DRIVER,
        }
    }, {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ]
    });
    return drivers;
};