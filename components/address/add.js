const db = require('../../database/connection');

module.exports = ((req,res) => {

    const { user_id,street_name,feature,suburb,city,zip_code,province,street_no } = req.body;

    db.query(
        "INSERT INTO address(user_id,street_name,feature,suburb,city,zip_code,province,street_no) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",[
           user_id,
           street_name,
           feature,
           suburb,
           city,
           zip_code,
           province,
           street_no,  
        ]
    ).then(response => {
        res.status(201).send(response.rows[0]);
    }).catch(err => {
        res.send(err);
    })

}) 