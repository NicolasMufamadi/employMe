const db = require('../../database/connection')

module.exports = ((req,res) =>{

    const userId = req.params.id 
    db.query("UPDATE users SET organization = ($1) WHERE user_id = ($2) RETURNING *",[req.body.organization,userId])
    .then(response =>{
        res.status(200).send(response)
    }).catch(err => {
        res.status(404).send(err)
    })

})