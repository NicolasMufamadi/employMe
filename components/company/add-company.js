const db = require('../../database/connection')

module.exports = ((req,res) => {

    const { company_manager_id, company_registration_no,company_name } = req.body

    db.query("INSERT INTO companies(company_manager_id, company_registration_no,company_name) VALUES($1,$2,$3) RETURNING *",[
        company_manager_id, company_registration_no,company_name
    ]).then(response =>{
        res.status(201).send(response)
    }).catch(err =>{
        res.status(500).send(err)
    })

})