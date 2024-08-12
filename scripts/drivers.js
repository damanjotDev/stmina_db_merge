const { Sequelize } = require('sequelize');

async function transferDriverData(inConnection,table) {
    const batchSize = 1000;
    let offset = 0;
    let moreRecords = true;
        try {
            while(moreRecords) {
                const data = await inConnection.query('SELECT * FROM driver LIMIT :limit OFFSET :offset', {
                    replacements: { limit: batchSize, offset },
                    type: Sequelize.QueryTypes.SELECT
                });

                // console.log("14", data)
                const new_data = data.map((ele)=>{
                    return {
                        id: ele.id || ele._id,
                        firstName: ele.first_name || ele.firstName,
                        lastName: ele.last_name || ele.lastName,
                        status: ele.status,
                        tfn: ele.tfn,
                        homeNumber: ele.home_number || ele.homeNumber,
                        abn: ele.abn || ele.Abn,
                        mobileNumber: ele.mobile_number || ele.mobileNumber,
                        registrationExpiryDate: ele.registration_expiry_date || ele.registrationExpiryDate,
                        insuranceExpiryDate: ele.insurance_expiry_date || ele.insuranceExpiryDate,
                        from: ele.from,
                        carPlateRegistrationNumber: ele.car_plate_registration_number || ele.carPlateRegistrationNumber,
                        employmentType: ele.employment_type || ele.employmentType,
                        insurancePolicyNumber: ele.insurance_policy_number || ele.insurancePolicyNumber,
                        scannerNumber: ele.scanner_number || ele.scannerNumber,
                        scannerPassword: ele.scanner_password || ele.scannerPassword,
                        scannerUserName: ele.scanner_user_name || ele.scannerUserName || ele.scanner_username,
                        wages: ele.wages,
                        email: ele.email,
                        password: ele.password,
                        createdAt: ele.created_at || ele.createdAt,
                        updatedAt: ele.updated_at || ele.updatedAt,
                        geometry: ele.geometry,
                        locationTime: ele.location_time || ele.locationTime,
                        driverType: ele.driver_type || ele.driverType
                      }
                })

                if (data.length > 0) {
                    await table.bulkCreate(new_data);
                    offset += data.length;
                } else {
                    moreRecords = false;
                }
            }

        console.log(`Data transferred from inDatabase to outDatabase for drivers table ----------> recordsCount : ${offset}`);
    } catch (err) {
        console.error('Error transferring data:', err);
    }
}

module.exports = { transferDriverData }
