const db = require('../../database/connection');

module.exports = ((req,res) =>{ 

    const qualification_id = req.params.user_id;

    db.query('DELETE FROM qualifications WHERE qualification_id = ($1)',[qualification_id])
    .then(response =>{
        res.status(200).send(response);
    }).catch(err => {
        res.send(404).send(err);
    })

})