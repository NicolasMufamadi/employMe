const db = require('../../database/connection');

module.exports = (async(req,res)=> {

    const qualification_id = req.params.qualification_id;
    const {qualification_status,qualification_type,institution_name,study_field,study_type,starting_date,ending_date,skills} = req.body;
    
    try {
        
        const getQualification = await db.query("SELECT * FROM qualifications WHERE qualification_id = ($1)",[qualification_id]);
        const qualification = await getQualification.rows[0];
        
        db.query("UPDATE  qualifications SET user_id = ($1), qualification_status = ($2), institution_name = ($3), study_field = ($4), study_type = ($5), starting_date = ($6), ending_date = ($7), skills = ($8) WHERE qualification_id = ($9) RETURNING*",[
            qualification.user_id,
            qualification_status ? qualification_status : qualification.qualification_status,
            qualification_type ? qualification_type : qualification.qualification_type,
            institution_name ? institution_name : qualification.institution_name,
            study_field ? study_field : qualification.study_field,
            study_type ? study_type : qualification.study_type,
            starting_date ? starting_date : qualification.starting_date,
            ending_date ? ending_date : qualification.ending_date,
            skills,
            qualification_id
        ]).then(response => {
            res.status(200).send(response.rows[0]);
        }).catch(err => {
            res.status(400).send(err);
        })
        
    } catch (error) {
        res.status(404).send(error);
    }

})