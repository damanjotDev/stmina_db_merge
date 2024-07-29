const CONSTANTS = require('./constants');
const  CONFIG = require('../config');
const BCRYPT = require('bcrypt');
   
let commonFunctions = {};

/**
 * encrypt password in case user login implementation
 * @param {*} payloadString 
 */
commonFunctions.hashPassword = (payloadString) => {
    return BCRYPT.hashSync(payloadString, CONSTANTS.SECURITY.BCRYPT_SALT);
};

// // check if a JSON is valid or not
// commonFunctions.isJSONValid = (jsonString) => {
//     try {
//         var o = JSON.parse(jsonString);
//         if (o && typeof o === "object") {
//             return true;
//         }
//     }
//     catch (e) { }
//     return false;
// };

// /**
//  * @param {string} plainText 
//  * @param {string} hash 
//  */
// commonFunctions.compareHash = (payloadPassword, userPassword) => {
//     return BCRYPT.compareSync(payloadPassword, userPassword);
// };

/**
 * function to get array of key-values by using key name of the object.
 */
commonFunctions.getEnumArray = (obj) => {
    const temp = Object.keys(obj).map(key => obj[key]);
    return temp;
};

/** create jsonwebtoken **/
// commonFunctions.encryptJwt = (payload) => {
//     let token = JWT.sign(payload, CONSTANTS.SECURITY.JWT_SIGN_KEY, { algorithm: 'HS256', expiresIn: CONSTANTS.SECURITY.JWT_EXPIRY_TIME });
//     return token;
// };

// commonFunctions.decryptJwt = (token) => {
//     return JWT.verify(token, CONSTANTS.SECURITY.JWT_SIGN_KEY, { algorithm: 'HS256' })
// }

/**
 * function to convert an error into a readable form.
 * @param {} error 
 */
// commonFunctions.convertErrorIntoReadableForm = (error) => {
//     let errorMessage = '';
//     if (error.message.indexOf("[") > -1) {
//         errorMessage = error.message.substr(error.message.indexOf("["));
//     } else {
//         errorMessage = error.message;
//     }
//     errorMessage = errorMessage.replace(/"/g, '');
//     errorMessage = errorMessage.replace('[', '');
//     errorMessage = errorMessage.replace(']', '');
//     error.message = errorMessage;
//     return error;
// };

// /***************************************
//  **** Logger for error and success *****
//  ***************************************/
// commonFunctions.messageLogs = (error, success) => {
//     if (error)
//         console.log(`\x1b[31m` + error);
//     else
//         console.log(`\x1b[32m` + success);
// };

// // check if year is leap year or not 
// commonFunctions.isLeapYear = (year) => {
//     year = parseInt(year);
//     //three conditions to find out the leap year
//     if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400))
//         return true;
//     return false;
// }

// /**
//  * function to get pagination condition for aggregate query.
//  */
// commonFunctions.getPaginationConditionForAggregate = (sort, skip, limit) => {
//     let condition = [
//         ...(!!sort ? [{ $sort: sort }] : []),
//         { $skip: skip },
//         { $limit: limit }
//     ];
//     return condition;
// };

// /**
//  * function to remove undefined keys from the payload.
//  */
// commonFunctions.removeUndefinedKeysFromPayload = (payload = {}) => {
//     for (let key in payload) {
//         if (!payload[key]) {
//             delete payload[key];
//         }
//     }
// };

// commonFunctions.isInt = (n) => {
//     return Number(n) === n && n % 1 === 0;
// }

// commonFunctions.isFloat = (n) => {
//     return Number(n) === n && n % 1 !== 0;
// }

// /**
//  * Send an email to perticular user mail 
//  */
// commonFunctions.sendEmail = async (to, data, type) => {
//     const email = commonFunctions.emailTypes(type, data);
//     email.template = fs.readFileSync(email.template, 'utf-8');
//     const message = await commonFunctions.renderTemplate(email.template, email.data);

//     let emailToSend = {
//         from: CONFIG.SMTP.SENDER,
//         to,
//         subject: email.subject,
//         html: message
//     }

//     return new Promise(async (resolve, reject) => {
//         try {
//             // let info = await transporter.sendMail(emailToSend);
//             resolve({});
//         } catch (err) {
//             reject(err)
//         }

//     })
// };

commonFunctions.emailTypes = (type, payload) => {
    let EmailData = {
        subject: '',
        data: {
            logo: `${CONFIG.SERVER_URL}/public/images/cmi_logo.png`
        },
        template: ''
    };
    switch (type) {
        case CONSTANTS.EMAIL_TYPES.FORGOT_PASSWORD_EMAIL:
            EmailData['subject'] = CONSTANTS.EMAIL_SUBJECTS.FORGOT_PASSWORD_EMAIL;
            EmailData.template = CONSTANTS.EMAIL_CONTENTS.FORGOT_PASSWORD_EMAIL;
            EmailData.data['uniqueCode'] = payload.uniqueCode;
            break;

        case CONSTANTS.EMAIL_TYPES.SUB_ADMIN_REGISTRATION:
            EmailData['subject'] = CONSTANTS.EMAIL_SUBJECTS.SUB_ADMIN_REGISTRATION;
            EmailData.template = CONSTANTS.EMAIL_CONTENTS.SUB_ADMIN_REGISTRATION;
            EmailData.data['password'] = payload.password;
            EmailData.data['name'] = payload.name;
            break;

        case CONSTANTS.EMAIL_TYPES.EMAIL_BROADCAST_NOTIFICATION:
            EmailData['subject'] = CONSTANTS.EMAIL_SUBJECTS.EMAIL_BROADCAST_NOTIFICATION;
            EmailData.template = CONSTANTS.EMAIL_CONTENTS.EMAIL_BROADCAST_NOTIFICATION;
            EmailData.data['notificationMessage'] = payload.notificationMessage;
            break;

        case CONSTANTS.EMAIL_TYPES.FORGOT_PASSWORD_EMAIL_SPIRO:
            EmailData['subject'] = CONSTANTS.EMAIL_SUBJECTS.FORGOT_PASSWORD_EMAIL_SPIRO;
            EmailData.template = CONSTANTS.EMAIL_CONTENTS.FORGOT_PASSWORD_EMAIL_SPIRO;
            EmailData.data['uniqueCode'] = payload.uniqueCode;
            break;
        case CONSTANTS.EMAIL_TYPES.ACCOUNT_ACTIVATION:
            EmailData['subject'] = CONSTANTS.EMAIL_SUBJECTS.ACCOUNT_ACTIVATION;
            EmailData.template = CONSTANTS.EMAIL_CONTENTS.ACCOUNT_ACTIVATION;
            EmailData.data['activationLink'] = payload.activationLink;
            break;

        default:
            EmailData['Subject'] = 'Welcome Email!';
            break;
    }
    return EmailData;
};

// commonFunctions.renderTemplate = (template, data) => {
//     return HANDLEBARS.compile(template)(data);
// };

/**
 * function to create reset password link.
 */
commonFunctions.createResetPasswordLink = (userData) => {
    let dataForJWT = { _id: userData._id, Date: Date.now, email: userData.email };
    let resetPasswordToken = commonFunctions.encryptJwt(dataForJWT);
    let resetPasswordLink = CONFIG.UI_PATHS.BASE_PATH + CONFIG.UI_PATHS.RESET_PASSWORD_PATH + resetPasswordToken;
    return { resetPasswordLink, resetPasswordToken };
};

/**
 * function to create reset password link.
 */
commonFunctions.createAccountRestoreLink = (userData) => {
    let dataForJWT = { previousAccountId: userData._id, Date: Date.now, email: userData.email, newAccountId: userData.newAccountId };
    let accountRestoreLink = CONFIG.SERVER_URL + '/v1/user/restore/' + commonFunctions.encryptJwt(dataForJWT);
    return accountRestoreLink;
};

/**
 * function to generate random alphanumeric string
 */
commonFunctions.generateAlphanumericString = (length) => {
    let chracters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomString = '';
    for (var i = length; i > 0; --i) randomString += chracters[Math.floor(Math.random() * chracters.length)];
    return randomString;
};

/**
 * function to generate random otp string
 */
commonFunctions.generateRandomString = (otplength = 6, sampleSpace = '0123456789') => {
    let randomString = '',
        range = sampleSpace.length;
    for (let index = 0; index < otplength; index++) {
        randomString += sampleSpace[Math.floor(Math.random() * (range - 1))];
    }
    return randomString;
}

/**
 * function to sent sms via AWS-SNS
 * @param {receiver} phoneNumber
 * @param {content} SMS 
 */
commonFunctions.sendSms = async (receiver, content) => {
    let msg = {
        "message": content,
        "sender": CONFIG.AWS.SMS_SENDER,
        "phoneNumber": receiver
    };
    console.log(content)
    let smsResponse = await awsSms(awsConfig, msg);
    return smsResponse
}

/**
 * convert CSV to JSON ARRAY
 */
commonFunctions.convertFileToJSONData = async (file) => {
    let arr = file.originalname.split('.');
    if (arr[arr.length - 1].includes("csv")) {
        return await csv().fromString(file.buffer.toString());
    } else if (arr[arr.length - 1].includes("json")) {
        return JSON.parse(file.buffer.toString());
    }
}

/**
 * create sorting object
 */
commonFunctions.createSortingObject = (sortKey, sortDirection) => {
    return {
        order: [[sortKey, ...(sortDirection == 1 ? ['ASC'] : ['DESC'])]]
    }
}

/**
 * check duplication within an array
 */
commonFunctions.checkDuplicatesInArray = (arr) => {
    let result = false;
    // create a Set with array elements
    const s = new Set(arr);
    // compare the size of array and Set
    if (arr.length !== s.size) {
        result = true;
    }
    if (result)
        return true;
    return false;
};

/**
 * Send an email to perticular user mail 
 * @param {*} email email address
 * @param {*} subject  subject
 * @param {*} content content
 * @param {*} cb callback
 */
// commonFunctions.sendEmail = async (userData, type) => {
//     const transporter = require('nodemailer').createTransport(CONFIG.SMTP.TRANSPORT);
//     const handleBars = require('handlebars');
//     /** setup email data with unicode symbols **/
//     const mailData = commonFunctions.emailTypes(type, userData), email = userData.email;
//     mailData.template = fs.readFileSync(mailData.template, 'utf-8');
//     let template = handleBars.compile(mailData.template);

//     let result = template(mailData.data);

//     let emailToSend = {
//         to: email,
//         from: CONFIG.SMTP.SENDER,
//         subject: mailData.subject,
//         html: result
//     }
//     let res = await transporter.sendMail(emailToSend);
//     console.log("Node mailer response is ", res);
//     return res;
// };

/**
 * Send an email to perticular user mail 
 * @param {*} email email address
 * @param {*} subject  subject
 * @param {*} content content
 * @param {*} cb callback
 */
commonFunctions.sendNormalEmail = async (to,otp) => {
    const client = require('nodemailer').createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "testerdevronins@gmail.com",
            pass: "ksnluyfqfsckeygs"
        },
      });
    
    return client.sendMail(
        {
            from: "testerdevronins@gmail.com",
            to: to,
            subject: "OTP",
            html: `<div>${otp}</div>`,
        }
    )
};

// commonFunctions.sendEmail = async (userData, type) => {
//     /** setup email data with unicode symbols **/
//     const handleBars = require('handlebars');
//     const mailData = commonFunctions.emailTypes(type, userData), email = userData.email;
//     mailData.template = fs.readFileSync(mailData.template, 'utf-8');
//     let template = handleBars.compile(mailData.template);

//     let result = template(mailData.data);
//     const mandrill = require('node-mandrill')('z22cXopPJEPo1NG-mrzMnQ');
//     // send an e-mail
//     mandrill('/messages/send', {
//         message: {
//             to: [{ email, name: 'Rajan' }],
//             from_email: 'support@cmihealth.com',
//             subject: mailData.subject,
//             html: result
//         }
//     }, function (error, response) {
//         //uh oh, there was an error
//         if (error) console.log(JSON.stringify(error));

//         //everything's good, lets see what mandrill said
//         else console.log(response);
//     });
// };

/**
 * function to create random string of provided length.
 * @param {*} length 
 * @returns 
 */
commonFunctions.createRandomString = (length) => {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result.toUpperCase();
};

/**
 * function to create random numeric id.
 * @param {*} length 
 * @returns 
 */
commonFunctions.createUniqueId = (length) => {
    let chars = '0123456789';
    let result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return `CMI_${result}`;
};

/**
 * function to send email using mailjet.
 */
commonFunctions.sendTemplate = function (templateId, toEmail, subject, dataForTemplate, isBccEmail = null) {
    const mailjet = require("node-mailjet").connect(
        process.env.MAILJET_API_KEY,
        process.env.MAILJET_SECRET_KEY
    );

    if (!(toEmail instanceof Array)) {
        toEmail = [{ Email: toEmail }];
    }

    let mailObject = {
        From: {
            Email: CONFIG.SMTP.SENDER_EMAIL,
            Name: CONFIG.SMTP.SENDER_NAME,
        },
        To: toEmail,
        TemplateID: templateId,
        TemplateLanguage: true,
        Subject: subject,
        Variables: dataForTemplate,
    };

    if (isBccEmail) {
        mailObject.To = [{ Email: isBccEmail }];
        mailObject.Bcc = toEmail;
    }


    const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [mailObject],
    });
    request
        .then((result) => {
            console.log("Node mailjet response ", result.body);
        })
        .catch((err) => {
            console.log(err.statusCode);
        });
};

/**
 * function to create manual delay
 * @param {*} delay delay in milliseconds.
 * @returns 
 */
commonFunctions.addDelay = async (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), delay);
    });
};

/**
* function to make http request.
* @param {*} method method declaration i.e. POST, GET, PUT, PATCH, DELETE
* @param {*} url URL for the request
* @param {*} body request body data if required
* @param {*} headers headers for the request.
* @returns Promise
*/
commonFunctions.makeHttpRequest = async (method, url, body, headers) => {
    try {
        const response = await axios({
            method,
            url,
            data: body,
            headers,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            timeout: 150000,
        });
        // console.log("response in utils is ", response);
        return { statusCode: 200, status: true, data: response.data };
    } catch (err) {
        console.log("Error in http request is ", err);
        return { statusCode: err?.response?.status, status: false, message: err?.response?.statusText || "Error in http request" };
    }
};

/**
 * function to initialize mongo connection
 */
commonFunctions.initializeMongoConnection = async () => {
    // initialize mongodb 
    await require('../startup/db_mongo')();
};

module.exports = commonFunctions;