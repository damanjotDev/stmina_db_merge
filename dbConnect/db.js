'use strict';

const { Sequelize } = require('sequelize');
const { outDataBaseConfig, inDataBaseConfig } = require('../config/index.js');
const dbUtils = require('../utils/dbUtils.js');
const { transferUserData } = require('../scripts/users.js');
const { transferPartnerData } = require('../scripts/partners.js');
const { transferExpenseCategoriesData } = require('../scripts/expense_categories.js');
const { transferDriverData } = require('../scripts/drivers.js');
const { transferAreaData } = require('../scripts/areas.js');
const { transferRateData } = require('../scripts/rates.js');
const { transferPartnerInvoiceData } = require('../scripts/partner_invoices.js');
const { transferPackageData } = require('../scripts/packages.js');
const { transferInvoiceData } = require('../scripts/invoices.js');
const { transferforgotPasswordData } = require('../scripts/forgot_passwords.js');
const { transferExpenseSalariesData } = require('../scripts/expense_salaries.js');
const { transferExpenseData } = require('../scripts/expenses.js');
const { transferDriverDocumentsData } = require('../scripts/driverDocuments.js');
const { transferDriverInOutData } = require('../scripts/driver_in_out.js');
const { transferDriverInOutPauseData } = require('../scripts/driver_in_out_pause.js');
const { transferDriverAreaData } = require('../scripts/driver_areas.js');
const { transferDailyEntriesData } = require('../scripts/daily_entries.js');
const { transferCustomDriverRateWeekendData } = require('../scripts/custom_driver_rate_weekend.js');
const { transferCustomDriverRateData } = require('../scripts/custom_driver_rate.js');

const outConnection = new Sequelize(outDataBaseConfig.DB_NAME, outDataBaseConfig.DB_USERNAME, outDataBaseConfig.DB_PASSWORD, {
    host: outDataBaseConfig.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        connectTimeout: 60000
    }
});

const inConnection = new Sequelize(inDataBaseConfig.DB_NAME, inDataBaseConfig.DB_USERNAME, inDataBaseConfig.DB_PASSWORD, {
    host: inDataBaseConfig.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        connectTimeout: 60000
    }
});

/**
 * Requiring models
 */
let models = {
    user: require("../models/stmina/userModel.js")(outConnection),
    drivers: require("../models/stmina/driverModel.js")(outConnection),
    expenses: require("../models/stmina/expenseModel.js")(outConnection),
    areas: require("../models/stmina/areaModel.js")(outConnection),
    packages: require("../models/stmina/packageModel.js")(outConnection),
    driverAreas: require("../models/stmina/driverAreaModel.js")(outConnection),
    expenseCategoryModel: require("../models/stmina/expenseCategoryModel.js")(outConnection),
    customDriverRateModel: require("../models/stmina/customDriverRateModel.js")(outConnection),
    dailyEntryModel: require("../models/stmina/dailyEntryModel.js")(outConnection),
    rateModel: require("../models/stmina/rateModel.js")(outConnection),
    forgotPasswordsModel: require("../models/stmina/forgotPasswordModel.js")(outConnection),
    expenseSalaryModel: require("../models/stmina/expenseSalaryModel.js")(outConnection),
    invoiceModel: require("../models/stmina/invoiceModel.js")(outConnection),
    customDriverRateWeekendsModel: require("../models/stmina/customDriverRateModelforWeekends.js")(outConnection),
    driverInOutModel: require("../models/stmina/driverInOutModel.js")(outConnection),
    driverInOutPauseModel: require("../models/stmina/driverInOutPauseModel.js")(outConnection),
    driversDocument: require("../models/stmina/driverDocumentsModel.js")(outConnection),
    partnerModel: require("../models/stmina/partnerModel.js")(outConnection),
    partnerInvoiceModel: require("../models/stmina/partnerInvoiceModel.js")(outConnection)
};

/**
 * Association of all tables
 */
Object.keys(models).forEach(model => {
    if (models[model].associate) {
        models[model].associate(models);
    }
});

async function authenticate() {
    try {
        await outConnection.authenticate();
        console.log(`'${outDataBaseConfig.DB_NAME}' database connected`);

        await outConnection.sync({ alter: true });
        console.log('Tables created and updated with initial data.');

        await inConnection.authenticate();
        console.log(`'${inDataBaseConfig.DB_NAME}' database connected`);

        /**
         * Function to transfer data from  inDatabase to outDatabase for non relational tables
        */
        // await transferUserData(inConnection, models.user);
        // await transferPartnerData(inConnection, models.partnerModel)
        // await transferExpenseCategoriesData(inConnection, models.expenseCategoryModel)
        
        await transferDriverData(inConnection, models.drivers)
        await transferAreaData(inConnection, models.areas)

        /**
         * Function to transfer data from  inDatabase to outDatabase for relational tabels
         */
        await transferPackageData(inConnection, models.packages)
        await transferRateData(inConnection, models.rateModel)
        // await transferPartnerInvoiceData(inConnection, models.partnerInvoiceModel)
        // await transferInvoiceData(inConnection, models.invoiceModel)
        // await transferforgotPasswordData(inConnection, models.forgotPasswordsModel)
        // await transferExpenseSalariesData(inConnection, models.expenseSalaryModel)
        await transferExpenseData(inConnection, models.expenses, models.expenseCategoryModel)
        // await transferDriverDocumentsData(inConnection, models.driversDocument)
        // await transferDriverInOutData(inConnection, models.driverInOutModel)
        // await transferDriverInOutPauseData(inConnection, models.driverInOutPauseModel)
        await transferDriverAreaData(inConnection, models.driverAreas)
        await transferDailyEntriesData(inConnection, models.dailyEntryModel)
        // await transferCustomDriverRateWeekendData(inConnection, models.customDriverRateWeekendsModel)
        await transferCustomDriverRateData(inConnection, models.customDriverRateModel)
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}

authenticate();

