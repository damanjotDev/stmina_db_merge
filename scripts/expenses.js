const { Sequelize } = require("sequelize");
const { createExpenseCategoriesData } = require("./expense_categories");

async function transferExpenseData(inConnection, table, expenseCategoryModel) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
  
    try {
      while (moreRecords) {
        const data = await inConnection.query('SELECT * FROM expense LIMIT :limit OFFSET :offset', {
          replacements: { limit: batchSize, offset },
          type: Sequelize.QueryTypes.SELECT
        });
  
        if (data.length > 0) {
          // Process records one by one
          const new_data = [];
  
          for (const ele of data) {
            // Create or find category
            const category = await createExpenseCategoriesData(expenseCategoryModel, ele.category.toUpperCase());
            
            // Prepare record for bulk insert
            new_data.push({
              id: ele.id || ele._id,
              amount: ele.amount,
              status: ele.status,
              driver_id: ele.driver_id || ele.driverId,
              category: category.categoryId, // Use categoryId obtained from async function
              description: ele.description,
              date: ele.data,
              receiptDocuments: ele.receipt_documents || ele.receiptDocuments || null,
              createdAt: ele.created_at || ele.createdAt,
              updatedAt: ele.updated_at || ele.updatedAt,
            });
          }
  
          // Insert records in batches
          await table.bulkCreate(new_data);
  
          // Update offset
          offset += data.length;
        } else {
          moreRecords = false;
        }
      }
  
      console.log(`Data transferred from inDatabase to outDatabase for expenses table ----------> recordsCount : ${offset}`);
    } catch (err) {
      console.error('Error transferring data:', err);
    }
  }

  module.exports = {transferExpenseData}