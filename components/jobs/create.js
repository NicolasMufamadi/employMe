const db = require('../../database/connection');

module.exports = ((req,res) => {
    db.query("INSERT INTO jobs(job_name,job_required_skills,job_description,job_qualification,job_required_skills,job_location,job_avg_salary,job_company) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
            [req.body.job_name,req.body.job_required_skills,req.body.job_description,req.body.job_qualification,req.body.job_required_skills,req.body.job_location,req.body.job_avg_salar,req.body.job_company])
    .then(response => {
        res.status(201).send(response.rows[0]);
    }).catch( err => {
        res.status(500).send(err);
    })
})