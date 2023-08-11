const db = require('../../database/connection');

module.exports = async(req,res) => {

    const offset = req.params.offset 

    try {
        const users = await db.query("SELECT * FROM Users ORDER BY user_id LIMIT 4 OFFSET ($1)",[offset]);
        if(users.rowCount > 0){
            res.status(200).send(users.rows);
        }else{
           res.status(404).send({err: "No users"});  
        }
    } catch (error) {
        console.log(error);
    }

}