const db = require('../../database/connection');

module.exports = ((req,res) => {

    const {user_id,qualification_status,qualification_type,institution_name,study_field,study_type,starting_date,ending_date,skills} = req.body;

    db.query("INSERT INTO qualifications(user_id,qualification_status,qualification_type,institution_name,study_field,study_type,starting_date,ending_date,skills) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING*",[
        user_id,
        qualification_status,
        qualification_type,
        institution_name,
        study_field,
        study_type,
        starting_date,
        ending_date,
        skills,
    
    ]).then(response => {
        res.status(201).send(response.rows[0]);
    }).catch(error => {
        res.status(400).send(error);
    })

})