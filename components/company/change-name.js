const db = require('../../database/connection')

module.exports = ((req,res) =>{

    const id = req.params.id 

    db.query("UPDATE companies SET company_name = ($1) WHERE company_id = ($2) VA RETURNING *",[req,body.company_name,id])
    .then(response =>{
        res.status(200).send(response)
    }).catch(err =>{
        res.status(404).send(err)
    })

})