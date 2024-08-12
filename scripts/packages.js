const { Sequelize } = require('sequelize');

async function transferPackageData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM package LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                // console.log("14", data)
                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        ausPostRate: ele.aus_post_rate || ele.ausPostRate || ele.aus_postrate,
                        ausPostRateFrom: ele.aus_post_rate_from || ele.ausPostRateFrom || ele.aus_postrate_from,
                        description: ele.description,
                        driverRate: ele.driver_rate || ele.driverRate,
                        driverRateFrom: ele.driver_rate_from || ele.driverRateFrom,
                        packageCategory: ele.package_category || ele.packageCategory,
                        status: ele.status,
                        type: ele.type,
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

        console.log(`Data transferred from inDatabase to outDatabase for packages table ----------> recordsCount : ${offset}`);
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferPackageData }
