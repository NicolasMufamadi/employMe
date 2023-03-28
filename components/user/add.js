const db =  require('../../database/connection');
const bcrypt = require('bcrypt');

module.exports = (req,res) =>{
    
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email.toLowerCase();
    const numberPhone = req.body.number_phone;
    const password = req.body.password; 
    const userrole = req.body.userrole ? req.body.userrole : "Employee";
    
    bcrypt.hash(password,10,(err,hash)=>{
        if(hash){
            
            db.query("INSERT INTO Users(first_name,last_name,email,password,number_phone,userrole) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[firstName,lastName,email,hash,numberPhone,userrole])
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

}