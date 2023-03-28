const db = require('../../database/connection');

module.exports = async (req,res) =>{

    const Id = req.params.user_id;
    const { first_name, last_name, email, number_phone, userrole } = req.body;

    console.log("hello");
 
    try {
        const getbyId = await db.query("SELECT * FROM Users WHERE user_id = ($1)", [Id])
        console.log(getbyId)
        const user = getbyId.rows[0];

        const update = await db.query("UPDATE Users SET last_name = ($1), userrole = ($2), first_name = ($3), email = ($4), number_phone = ($5) WHERE user_id = ($6) RETURNING *", [
            last_name ? last_name : user.last_name,
            userrole ? userrole : user.userrole,
            first_name ? first_name : user.first_name,
            email ? email : user.email,
            number_phone ? number_phone : user.number_phone,
            Id
        ]);
 
        res.send(update.rows[0])
    } catch (error) {
        res.send(error)
    }
}