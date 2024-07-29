const { Sequelize } = require('sequelize');

async function transferInvoiceData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM invoices LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                // console.log("14", data)
                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        invoice_date: ele.invoice_date || ele.invoiceDate,
                        driver_id: ele.driver_id || ele.driverId,
                        invoice_expense_category: ele.invoice_expense_category || ele.invoiceExpenseCategory,
                        amount: ele.amount,
                        area_id: ele.area_id || ele.areaId,
                        createdAt: ele.created_at || ele.createdAt,
                        updatedAt: ele.updated_at || ele.updatedAt
                      }
                })

                if (data.length > 0) {
                    await table.bulkCreate(new_data);
                    offset += data.length;
                } else {
                    moreRecords = false;
                }
            }

        console.log('Data transferred from inDatabase to outDatabase for invoices table');
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferInvoiceData }
