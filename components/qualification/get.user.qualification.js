const db = require('../../database/connection')

module.exports = ( async(req,res) => {

    const user_id = req.params.user_id;

    try {
        
        const userQualifications = await db.query("SELECT * FROM qualifications WHERE user_id = ($1)",[user_id]);
        res.status(200).send(userQualifications.rows);

    } catch (error) {
        res.status(404).send(error);
    }

    
})