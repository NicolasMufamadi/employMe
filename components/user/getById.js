const db = require('../../database/connection')

module.exports = async (req,res) => {

    const Id = req.params.user_id;

    try {
        const user = await db.query("SELECT * FROM Users WHERE user_id = ($1)",[Id]);
        if(user.rows[0]){
            res.status(200).send(user.rows[0]);
        }else{
            res.status(404).send({err: "User not found"});
        }
    } catch (error) {
        console.log(error);
    }


}