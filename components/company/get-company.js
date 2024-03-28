const db = require('../../database/connection')

module.exports = ((req,res) =>{

    const companyId = req.params.id 
    
    db.query("SELECT company_name,company_manager_id,company_registration_no,filepath FROM companies INNER JOIN company_logos ON companies.company_id = company_logos.company_id WHERE companies.company_id = ($1)",[companyId])
    .then(response =>{
        res.status(200).send(response.rows[0])   
    }).catch(err =>{
        res.status(404).send({"message": "Company doesn't exist"})
    })

})