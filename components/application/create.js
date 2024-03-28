const db = require('../../database/connection');

module.exports = ((req,res) => {
    
    const {user_id,job_id,job_name,job_match,application_status} = req.body 

    db.query("INSERT INTO applications(user_id,job_id,job_name,user_names,job_match,application_status) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [user_id,job_id,user_names,user_email,user_gender,job_match,application_status])
    .then(response => {
        res.status(201).send(response.rows[0]);
    }).catch( err => {
        res.send(err);
    })

})