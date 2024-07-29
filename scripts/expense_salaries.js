const { Sequelize } = require('sequelize');

async function transferExpenseSalariesData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM expense_salaries LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                // console.log("14", data)
                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        month: ele.month,
                        start_date: ele.start_date || ele.startDate,
                        finish_date: ele.finish_date || ele.finishDate,
                        area_id: ele.area_id || ele.areaId,
                        driver_id: ele.driver_id || ele.driverId,
                        amount: ele.amount,
                        status: ele.status,
                        description: ele.description,
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

        console.log('Data transferred from inDatabase to outDatabase for expense_salaries table');
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferExpenseSalariesData }
