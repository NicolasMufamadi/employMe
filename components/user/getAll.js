const db = require('../../database/connection');

module.exports = async(req,res) => {

    try {
        const users = await db.query("SELECT * FROM Users");
        if(users.rowCount > 0){
            res.status(200).send(users.rows);
        }else{
           res.status(404).send({err: "No users"});  
        }
    } catch (error) {
        console.log(error);
    }

}