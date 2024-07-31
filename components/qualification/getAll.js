const db = require('../../database/connection');

module.exports = (async(req,res) => {

    try {
        const q =await db.query('SELECT * FROM qualifications WHERE user_id = ($1)',[req.params.user_id]);
        res.send(q.rows)
    } catch (error) {
        res.send(error)
    }

})