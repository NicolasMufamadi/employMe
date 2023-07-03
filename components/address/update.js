const db = require('../../database/connection');

module.exports = ( async (req,res) => {

    const address_id = req.params.address_id;
    const { user_id,street_name,feature,suburb,city,zip_code } = req.body;

    try {
     
        const getAddress = await db.query("SELECT * FROM address WHERE user_id = ($1)",[user_id])
        const address = getAddress.rows[0];
       console.log(address)
        db.query("UPDATE address SET street_name = ($1), feature = ($2), suburb = ($3), city = ($4), zip_code = ($5) WHERE address_id = ($6)",[
            street_name,
            feature,
            suburb,
            city,
            zip_code,
            address_id
        
        ]).then( response => {
            res.status(200).send(response); 
        }).catch(err =>{
            res.status(400).send(err);
        })

    } catch (error) {
         console.log(error)       
    }

})