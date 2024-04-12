const db = require('../../database/connection');

module.exports = async (req,res) => {

    try {
        
        const getOTP = await db.query("SELECT * FROM otps WHERE otp_email = ($1)",[req.body.email])
        const time = new Date();

        if(time > parseInt(getOTP.rows[0].otp_exp)){
            await db.query("DELETE FROM otps WHERE otp_email = ($1)",[req.body.email])
            res.status(200).send({message: "Token expired"})
        }else if(req.body.otp !== getOTP.rows[0].otp_pin){
            res.status(200).send({message: "Incorrect Pin"})
        }else{
            res.status(200).send({message: "Verified"})
        }
    } catch (error) {
        res.send(error)
    }

}