const db = require('../../database/connection');

module.exports = (async(req,res) => {
    try {
        const applications = await db.query("SELECT * FROM applications WHERE user_id = ($1)",[req.params.user_id])
        if(applications.rowCount > 0){
             res.status(200).send(applications.rows);
        }
    } catch (error) {
        res.send(error);
    }
})