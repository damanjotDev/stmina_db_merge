const { Sequelize } = require('sequelize');

async function transferRateData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM rates LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                // console.log("14", data)
                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        effectiveDate: ele.effective_date || ele.effectiveDate,
                        effectiveRate: ele.effective_rate || ele.effectiveRate,
                        newStatus: ele.new_status || ele.newStatus,
                        oldDate: ele.old_date || ele.oldDate || ele.olddate,
                        oldRate: ele.old_rate || ele.oldRate || ele.oldrate,
                        oldStatus: ele.old_status || ele.oldStatus,
                        rateType: ele.rate_type || ele.rateType,
                        driver_id: ele.driver_id || ele.driverId,
                        package_id: ele.package_id || ele.packageId,
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

        console.log('Data transferred from inDatabase to outDatabase for rates table');
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferRateData }
