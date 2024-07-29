const { Sequelize } = require('sequelize');

async function transferPartnerInvoiceData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM partner_invoices LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                // console.log("14", data)
                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        data: ele.data,
                        partner_id: ele.partner_id || ele.partnerId,
                        total_amount: ele.total_amount || ele.totalAmount,
                        status: ele.status,
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

        console.log('Data transferred from inDatabase to outDatabase for partner_invoices table');
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferPartnerInvoiceData }
