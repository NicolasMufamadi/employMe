const db = require('../../database/connection');
const otpGenerator = require('otp-generator');

module.exports = (async (req,res) => {


    try {
        
            const user = await db.query("SELECT * FROM users WHERE email = ($1)",[req.body.email])
       
            const email = user.rows[0].email;
            const otp = otpGenerator.generate(6,{lowerCaseAlphabets: false,upperCaseAlphabets: false, specialChars: false})
            const date = new Date();
            const expTime = date.getTime() + 5 * 60000  
            
            const oldOTP = await db.query("SELECT * FROM otps WHERE otp_email = ($1)",[email])
            if(!oldOTP){
                //send email
                const requestOTP = await db.query("INSERT INTO otps(otp_pin,otp_exp,otp_email)  VALUES($1,$2,$3) RETURNING *",[otp,expTime,email])
                res.status(201).send({data: requestOTP.rows[0]})
            }else{
                //send email
                const update = await db.query("UPDATE otps set otp_pin = ($1) WHERE otp_email = ($2) RETURNING *",[otp,email])
                res.status(200).send({data: update.rows[0]})
            }

    } catch (error) {
        console.log(error)
    }

})