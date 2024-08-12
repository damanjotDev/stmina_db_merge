const { Sequelize } = require('sequelize');

async function transferExpenseCategoriesData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM expense_categories LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id, 
                        category: ele.category, 
                        description: ele.description,
                        createdAt: ele.created_at || ele.createdAt || new Date(),
                        updatedAt: ele.updated_at || ele.updatedAt || new Date()
                      }
                })

                if (data.length > 0) {
                    await table.bulkCreate(new_data);
                    offset += data.length;
                } else {
                    moreRecords = false;
                }
            }

        console.log('Data transferred from inDatabase to outDatabase for expense_categories table');
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

async function createExpenseCategoriesData(table, categoryName) {
        try {
            const data = await table.findOne({
                where : { category: categoryName },
                raw: true 
            });
        
            if(data){
                return { categoryId: data.id}
            }
            else{
                const res = await table.create({category: categoryName})
                console.log(`expense_categories createdc with name -------> ${categoryName}`);
                return { categoryId: res.id };
            }

    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferExpenseCategoriesData , createExpenseCategoriesData}
