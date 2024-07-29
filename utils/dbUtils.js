'use strict';

const CONSTANTS = require('./constants');

let dbUtils = {};

/**
 * adding data initially 
 */
dbUtils.addInitialData = async (models) => {
    let adminCount = await models['user'].count({ where: { role: CONSTANTS.USER_ROLES.SUPER_ADMIN } });

    if (!adminCount) {
        let admin = {
            // firstName: 'Adam',
            // lastName: 'Brat',
            email: 'admin',
            password: process.env.ADMIN_USER_PASSWORD || '12345',
            role: CONSTANTS.USER_ROLES.SUPER_ADMIN,
            // street: 'Street 9',
            // city: 'New York',
            // country: 'US',
            // postalCode: '123456',
            // countryIso: 'us',
            // phoneNumber: '+11234567890',
            // userCreatedOwnPassword: true,
            // isAccountVerified: true,
            // status: CONSTANTS.USER_STATUS.Approved
        }
        await models['user'].create(admin);
    }
    return true;
};

/**
 * function to fetch sort object
 * @param {*} sortObject 
 * @returns 
 */
dbUtils.getSortObject = (sortObject) => {
    let orderArray = [];
    for (let key in sortObject) {
        orderArray.push([key, sortObject[key]]);
    }
    return orderArray;
};

module.exports = dbUtils;