const db = require('../../database/connection')
const bcrypt = require('bcrypt')

module.exports = (async(req,res) => {

    const manager = req.params.id 
    const company = await db.query("SELECT * FROM companies WHERE company_manager_id = ($1)",[manager])

    const email = req.body.email?.toLoweCase()
    const password = req.body.password
    const organization = company.rows[0].organization
    const role = "HR"

    bcrypt.hash(password,10,(err,hash)=>{
        if(hash){
            
            db.query("INSERT INTO Users(email,password,userrole,organization) VALUES($1,$2,$3,$4) RETURNING *",[email,hash,role,organization])
            .then(response =>{
                if(response.rows[0]){
                    res.status(201).send(response.rows[0]);          
                }
            }).catch(err=>{
                if(err){
                    res.status(409).send({err: "Email already exists"});
                }
            })
        }
        if(err){
            console.log(err);
        }
    })

})