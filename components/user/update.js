const db = require('../../database/connection');

module.exports = async (req,res) =>{

    const Id = req.params.user_id;
    const { first_name, middle_name, last_name, email, number_phone, telephone, gender, userrole } = req.body;
 
    try {
        const getbyId = await db.query("SELECT * FROM Users WHERE user_id = ($1)", [Id])
        console.log(getbyId)
        const user = getbyId.rows[0];

        const update = await db.query("UPDATE Users SET first_name = ($1), middle_name = ($2), last_name = ($3), email = ($4), number_phone = ($5), telephone = ($6), gender = ($7), userrole = ($8) WHERE user_id = ($9) RETURNING *", [
            first_name ? first_name : user.first_name,
            middle_name ? middle_name : user.middle_name,
            last_name ? last_name : user.last_name,
            email ? email : user.email,
            number_phone ? number_phone : user.number_phone,
            telephone ? telephone : user.telephone,
            gender ? gender : user.gender,
            userrole ? userrole : user.userrole,
            Id
        ]);
 
        res.send({success: update.rows[0]})
       
    } catch (error) {
        res.send(error)
    }
}