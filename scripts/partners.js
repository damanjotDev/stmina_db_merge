const { Sequelize } = require('sequelize');

async function transferPartnerData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM partners LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        name: ele.name || ele.Name ,
                        abn: ele.abn || ele.Abn,
                        address: ele.address,
                        contractor_no: ele.contractor_no || ele.contractorNo,
                        contractor_abn: ele.contractor_abn || ele.contractorAbn,
                        contractor_address: ele.contractor_address || ele.contractorAddress,
                        status: ele.active || ele.isActive,
                        createdAt: ele.created_at || ele.createdAt,
                        updatedAt: ele.updated_at || ele.updatedAt,
                        partner_logo: ele.partner_logo || ele.partnerLogo,
                        contractor_name: ele.contractor_name || ele.contractorName,
                        contractor_logo: ele.contractor_logo || ele.contractorLogo
                      }
                })

                if (data.length > 0) {
                    await table.bulkCreate(new_data);
                    offset += data.length;
                } else {
                    moreRecords = false;
                }
            }

        console.log('Data transferred from inDatabase to outDatabase for partner table');
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferPartnerData }
