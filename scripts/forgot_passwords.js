const { Sequelize } = require('sequelize');

async function transferforgotPasswordData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM forgotPasswords LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });
                // console.group("14", data)

                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        driver_id: ele.driver_id || ele.driverId,
                        otp: ele.otp,
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

        console.log('Data transferred from inDatabase to outDatabase for forgetPasswords table');
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferforgotPasswordData }
