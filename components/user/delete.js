const db = require('../../database/connection');

module.exports = async (req,res) =>{

    const Id = req.params.user_id;

    try {
        const userToDelete = await db.query("DELETE  FROM Users WHERE user_id = ($1)",[Id]);
        console.log(userToDelete)
        if(userToDelete.rowCount > 0){
            res.status(200).send({success: "User successfully removed"});
        }else{
            res.status(404).send({err: "User not found"});
        }
    } catch (error) {
        console.log(error);
    }

}