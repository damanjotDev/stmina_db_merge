const { Sequelize } = require('sequelize');

async function transferDriverInOutPauseData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM driver_in_out_pauses LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                // console.log("14", data)
                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        date: ele.date,
                        log_in_time: ele.log_in_time || ele.login_time || ele.logInTime,
                        log_out_time: ele.log_out_time || ele.logout_time || ele.logOutTime,
                        driver_id: ele.driver_id || ele.driverId,
                        in_area_id: ele.in_area_id || ele.in_areaid || ele.inAreaId,
                        out_area_id: ele.out_area_id || ele.out_areaid || ele.outAreaId,
                        runing_Status: ele.runing_status || ele.runing_Status || ele.runingStatus,
                        geometry: ele.geometry,
                        locationTime: ele.location_time || ele.locationTime,
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

        console.log('Data transferred from inDatabase to outDatabase for driver_in_out_pauses table');
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferDriverInOutPauseData }
