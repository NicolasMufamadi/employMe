const db = require('../../database/connection');

module.exports = ( async(req,res) => {

    const user_id = req.params.user_id;

    try {
        
        const userAddress =  await db.query("SELECT * FROM address WHERE user_id = ($1)",[user_id]);
        res.status(200).send(userAddress.rows[0]);

    } catch (error) {
       res.status(404).send(error);
    }

})