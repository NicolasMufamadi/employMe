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

            const payLoad = {
                user_id: auth.rows[0].user_id,
                first_name: auth.rows[0].first_name,
                middle_name: auth.rows[0].middle_name,
                last_name: auth.rows[0].last_name,
                number_phone: auth.rows[0].number_phone,
                telephone: auth.rows[0].telephone,
                email: auth.rows[0].email,
                userrole: auth.rows[0].userrole, 
                gender: auth.rows[0].gender,
                organization: auth.rows[0].organization
            }
            if(isMatch){
                
                const token = jwt.sign(payLoad,process.env.SECRET,{
                    expiresIn: '1hr'
                })
                res.status(200).send({data: auth.rows[0],token: token});
            }else{
            res.status(404).send({err: "Wrong password or email"});
        }
     }else{
        res.status(404).send({err: "Wrong password or email"});
     }
    } catch (error) {
        res.status(404).send({err: "Wrong password or email"});
    }


}

