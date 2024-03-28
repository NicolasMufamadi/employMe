const db = require('../../database/connection');

module.exports = (async (req,res) => {
    
    try {
        const jobs = await db.query("SELECT * FROM jobs");
        console.log(jobs.rows)
        if(jobs.rowCount > 0){
            res.status(200).send(jobs.rows);
        }else{
           res.status(404).send("No job found");
        }
    } catch (error) {
        res.status(500).send(error);
    }


})