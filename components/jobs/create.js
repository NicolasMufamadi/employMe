const db = require('../../database/connection');

module.exports = ((req,res) => {
    db.query("INSERT INTO jobs(job_name,job_skills,job_description) VALUES($1,$2,$3) RETURNING *",[req.body.job_name,req.body.job_skills,req.body.job_description])
    .then(response => {
        res.status(201).send(response.rows[0]);
    }).catch( err => {
        res.status(500).send(err);
    })
})