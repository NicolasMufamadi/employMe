const db = require('../../database/connection');

module.exports = ( async (req,res) => {

    const address_id = req.params.address_id;
    const { street_no,street_name,feature,suburb,city,zip_code,province } = req.body;

    try {

        const update = await db.query("UPDATE address SET street_no = ($1), street_name = ($2), feature = ($3), suburb = ($4), city = ($5), zip_code = ($6), province =($7) WHERE address_id = ($8) RETURNING *",[
            street_no,
            street_name,
            feature,
            suburb,
            city,
            zip_code,
            province,
            address_id
        
        ])

        res.status(200).send(update.rows[0])

    } catch (error) {
         console.log(error)       
    }

})