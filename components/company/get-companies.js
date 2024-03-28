const db = require('../../database/connection')

module.exports = ((req,res) =>{
 
    db.query("SELECT company_name,company_manager_id,company_registration_no,filepath FROM companies INNER JOIN company_logos ON companies.company_id = company_logos.company_id")
    .then(response =>{
        res.status(200).send(response.rows)   
    }).catch(err =>{
        res.status(404).send({"message": "No company found"})
    })

})