const moment = require('moment');
const { Sequelize } = require('sequelize');

async function transferCustomDriverRateData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM customdriverrate LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                // console.log("14", data)
                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        package_id: ele.package_id || ele.packageId,
                        driver_id: ele.driver_id || ele.driverId,
                        customRate: ele.custom_rate || ele.customRate,
                        effectiveDate: ele.effectiveDate ? ele.effectiveDate :moment().utc().subtract(1, 'days').startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]'),
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

        console.log(`Data transferred from inDatabase to outDatabase for custom_driver_rates table ----------> recordsCount : ${offset}`);
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferCustomDriverRateData }
