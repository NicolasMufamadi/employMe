const db = require('../../database/connection');

module.exports = (async (req,res) => {
    
    try {
        const users = await db.query("SELECT * FROM jobs");
        console.log(users.rows)
        if(users.rowCount > 0){
            res.status(200).send(users.rows);
        }else{
           res.status(404).send("No user found");
        }
    } catch (error) {
        res.status(500).send(error);
    }


})