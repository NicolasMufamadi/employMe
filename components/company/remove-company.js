const db = require('../../database/connection')

module.exports = ((req,res)=>{

    const companyId = req.params.id

    db.query("DELETE FROM companies WHERE company_id = ($1)",[companyId])
    .then(response => {
        res.status(200).send({"message": "Company successfully removed"})
    }).catch(err =>{
        res.status(404).send({"message": "Company not found"})
    })

})