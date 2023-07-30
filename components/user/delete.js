const db = require('../../database/connection');

module.exports = async (req,res) =>{

    const Id = req.params.user_id;

    try {
        const user = await db.query("SELECT * FROM Users WHERE user_id = ($1)",[Id])
        
        if(user.rows[0].userrole === 'Employee'){

            const userToDelete = await db.query("DELETE  FROM Users WHERE user_id = ($1)",[Id]);
              if(userToDelete.rowCount > 0){
                  res.status(200).send({success: "User successfully removed"});
              }else{
                  res.status(404).send({err: "User not found"});
              }

        }else{
            res.send({denied: "Please change user role to Employee and then proceed with the delete"})
        }
        
    } catch (error) {
        console.log(error);
    }

}