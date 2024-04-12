const db = require('../../database/connection');
const bcrypt = require('bcrypt');

module.exports = (async(req,res) => {
    
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    try {
        const user = await db.query("SELECT * FROM Users WHERE user_id = ($1)",[req.params.user_id])
        const isMatch = await bcrypt.compare(currentPassword,user.rows[0].password)
        console.log(user)
        if(isMatch){
            if(!re.test(newPassword)){
                res.send({err: 'Password must have min 8 characters, with at least a symbol, upper and lower case letters and a number'})
            }else if(newPassword === currentPassword){
                res.send({err: 'New password must be different from current password'})
            }else{
                bcrypt.hash(newPassword,10,(err,hash) => {
                    if(hash){
                        db.query("UPDATE users SET password = ($1) WHERE user_id = ($2)",[hash,req.params.user_id])
                        res.status(201).send({success: 'Password updated successfully'})
                    }
                })
            }
        }else{
            res.send({err: "Current password incorrect"})
        }
    } catch (error) {
        res.status(500).send({err: error})
    }

})