const db = require('../../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req,res) => {

    const email = req.body.email.toLowerCase();
    const clearPassword = req.body.password;

    try {
        const auth = await db.query("SELECT * FROM Users WHERE email = ($1)",[email]);
        
        if(auth.rows[0]){
            const isMatch = await bcrypt.compare(clearPassword,auth.rows[0].password);
            if(isMatch){
                const token = jwt.sign(auth.rows[0],process.env.SECRET,{
                    expiresIn: '30min'
                })
                res.status(200).send({data: auth.rows[0],token: token});
            }else{
            res.status(404).send({passwordErr: "Password Incorrect"});
        }
     }else{
        res.status(404).send({emailErr: "Email does not exist"});
     }
    } catch (error) {
        res.status(404).send(error);
    }


}

