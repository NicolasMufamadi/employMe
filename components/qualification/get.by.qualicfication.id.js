const db = require('../../database/connection');

module.exports = (async(req,res)=> {

    const qualification_id = req.params.qualification_id;
    
    try {
        
        const getQualification = await db.query("SELECT * FROM qualifications WHERE qualification_id = ($1)",[qualification_id]);
        const qualification = await getQualification.rows[0];
        qualification ? res.status(200).send(qualification) : res.status(404).send('Qualification not found');
        
    } catch (error) {
        res.status(404).send(error);
    }

})