'use strict';

const MODELS = require('../startup/db').models;
/********************************
 **** Managing all the models ***
 ********* independently ********
 ********************************/
let models = {
    userModel: MODELS.users,
    expenseCategoryModel: MODELS.expense_categories,
    // packageCategoryModel: MODELS.package_categories,
    areasModel: MODELS.areas,
    driversModel: MODELS.drivers,
    expenseModel: MODELS.expenses,
    packagesModel: MODELS.packages,
    driverAreasModel: MODELS.driver_areas,
    // packageTypeModel: MODELS.package_types,
    customDriverRateModel: MODELS.custom_driver_rates,
    dailyEntryModel: MODELS.dailyEntries,
    ratesModel: MODELS.rates,
    forgotPasswordsModels: MODELS.forgotPasswords,
    expenseSalaryModels: MODELS.expense_salary,
    invoiceModels: MODELS.invoices,
    partnerModel: MODELS.partners,
    partnerInvoiceModel: MODELS.partner_invoices,
    customDriverRateWeekendsModel: MODELS.custom_driver_rates_weekends,
    driverInOutModel: MODELS.driver_in_out,
    driverInOutPauseModel:MODELS.driver_in_out_pause,
    driversDocumentModel: MODELS.driversDocument
};
/**
 * for one to one
 */
// models.driversModel.hasOne(models.expenseModel, { foreignKey: 'driver_id', as: 'driverExpense' });
// models.expenseModel.belongsTo(models.driversModel, { foreignKey: 'driver_id' })


models.driversModel.hasMany(models.expenseModel, { foreignKey: 'driver_id'});
models.expenseModel.belongsTo(models.driversModel, { foreignKey: 'driver_id' })

// models.packagesModel.hasMany(models.areasModel, { foreignKey: 'area_id' });
models.packagesModel.belongsTo(models.areasModel, { foreignKey: 'area_id' })

models.areasModel.belongsToMany(models.driversModel, {through : models.driverAreasModel,  foreignKey: 'area_id'})
models.driversModel.belongsToMany(models.areasModel, {through : models.driverAreasModel,  foreignKey: 'driver_id'})


models.expenseModel.belongsTo(models.expenseCategoryModel,{foreignKey: "category"})
// models.packagesModel.belongsTo(models.packageCategoryModel,{foreignKey: "packageCategory"})
// models.packagesModel.belongsTo(models.packageTypeModel,{foreignKey: "type"})

// it will work when we apply query on packageModel and driversModel
// models.packagesModel.belongsToMany(models.driversModel, {through : models.customDriverRateModel,  foreignKey: 'package_id'})
// models.driversModel.belongsToMany(models.packagesModel, {through : models.customDriverRateModel,  foreignKey: 'driver_id'})

models.customDriverRateModel.belongsTo(models.driversModel, {foreignKey:"driver_id"})
models.customDriverRateModel.belongsTo(models.packagesModel, {foreignKey:"package_id"})
// models.customDriverRateModel.belongsTo(models.areasModel, {foreignKey:"area_id"}) // not needed, should not be there

models.dailyEntryModel.belongsTo(models.driversModel, {foreignKey:"driver_id"})
models.dailyEntryModel.belongsTo(models.packagesModel, {foreignKey:"package_id"})

models.expenseSalaryModels.belongsTo(models.driversModel, {foreignKey: 'driver_id'})
models.expenseSalaryModels.belongsTo(models.areasModel, {foreignKey: 'area_id'})

models.invoiceModels.belongsTo(models.driversModel, {foreignKey: 'driver_id'})
models.invoiceModels.belongsTo(models.areasModel, {foreignKey: 'area_id'})

models.customDriverRateWeekendsModel.belongsTo(models.driversModel, {foreignKey:"driver_id"})
models.customDriverRateWeekendsModel.belongsTo(models.packagesModel, {foreignKey:"package_id"})


models.driverInOutModel.belongsTo(models.driversModel, {foreignKey: 'driver_id'})
models.driverInOutModel.belongsTo(models.areasModel, {foreignKey: 'in_area_id', as: 'in_area'})
models.driverInOutModel.belongsTo(models.areasModel, {foreignKey: 'out_area_id', as: 'out_area'})

models.driverInOutPauseModel.belongsTo(models.driversModel, {foreignKey: 'driver_id'})
models.driverInOutPauseModel.belongsTo(models.areasModel, {foreignKey: 'in_area_id', as: 'in_area_pause'})
models.driverInOutPauseModel.belongsTo(models.areasModel, {foreignKey: 'out_area_id', as: 'out_area_pause'})


models.driversDocumentModel.belongsTo(models.driversModel, {foreignKey: 'driver_id'})
models.driversModel.hasMany(models.driversDocumentModel, { foreignKey: 'driver_id'});

models.invoiceModels.belongsTo(models.expenseCategoryModel,{foreignKey: "invoice_expense_category"})

models.partnerInvoiceModel.belongsTo(models.partnerModel, {foreignKey: 'partner_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})


module.exports = models;