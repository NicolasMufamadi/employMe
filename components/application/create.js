const db = require('../../database/connection');

module.exports = ((req,res) => {

    db.query("INSERT INTO applications(user_id,job_id) VALUES($1,$2) RETURNING *",[req.body.user_id,req.body.job_id])
    .then(response => {
        res.status(201).send(response.rows[0]);
    }).catch( err => {
        res.send(err);
    })

})