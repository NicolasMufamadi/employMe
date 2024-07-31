const db = require('../../database/connection');

module.exports = ( async(req,res) => {

    const user_id = req.params.user_id;

    try {
        
        const userAddress =  await db.query("SELECT * FROM address WHERE user_id = ($1)",[user_id]);
        console.log(userAddress)
       if(userAddress.rowCount > 0){
            res.status(200).send({data: userAddress.rows});
       }else{
           res.status(200).send({data: []});
       }

    } catch (error) {
        res.status(500).send(error)
    }

})