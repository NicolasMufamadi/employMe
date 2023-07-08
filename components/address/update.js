const db = require('../../database/connection');

module.exports = ( async (req,res) => {

    const address_id = req.params.address_id;
    const { user_id,street_no,street_name,feature,suburb,city,zip_code,province } = req.body;

    try {
     
        const getAddress = await db.query("SELECT * FROM address WHERE user_id = ($1)",[user_id])
        const address = getAddress.rows[0];
       console.log(address)
        db.query("UPDATE address SET street_no = ($1), street_name = ($2), feature = ($3), suburb = ($4), city = ($5), zip_code = ($6), province =($7) WHERE address_id = ($8)",[
            street_no,
            street_name,
            feature,
            suburb,
            city,
            zip_code,
            province,
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