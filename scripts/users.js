const { Sequelize } = require('sequelize');

async function transferUserData(inConnection,user) {
    try {
        const users = await inConnection.query('SELECT * FROM users', {
            type: Sequelize.QueryTypes.SELECT
        });

        const new_users = users.map((ele)=>{
            return {
                id: ele.id || ele._id,
                email: ele.email || ele.Email,
                role: ele.role || ele.Role,
                password: ele.password || ele.Password,
                createdAt: ele.created_at || ele.createdAt,
                updatedAt: ele.updated_at || ele.updatedAt,
                first_name: ele.first_name || ele.firstName,
                last_name: ele.last_name || ele.lastName,
                phone_number: ele.phone_number || ele.phoneNumber,
                dob: ele.dob || ele.dob
            }
        })

		await user.bulkCreate(new_users)

        console.log('Data transferred from inDatabase to outDatabase for user table');
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferUserData}
