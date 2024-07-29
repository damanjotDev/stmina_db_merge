const { Sequelize } = require('sequelize');

async function transferExpenseData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM expenses LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                // console.log("14", data)
                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        amount: ele.amount,
                        status: ele.status,
                        driver_id: ele.driver_id || ele.driverId,
                        category: ele.category,
                        description: ele.description,
                        date: ele.data,
                        receiptDocuments: ele.receipt_documents || ele.receiptDocuments || null,
                        createdAt: ele.created_at || ele.createdAt,
                        updatedAt: ele.updated_at || ele.updatedAt,
                      }
                })

                if (data.length > 0) {
                    await table.bulkCreate(new_data);
                    offset += data.length;
                } else {
                    moreRecords = false;
                }
            }

        console.log('Data transferred from inDatabase to outDatabase for expenses table');
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferExpenseData }
