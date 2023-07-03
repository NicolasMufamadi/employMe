const db = require('../../database/connection');

module.exports = (async(req,res) => {

    try {
        const q =await db.query('SELECT * FROM qualifications WHERE user_id = 3');
        res.send(q.rows)
    } catch (error) {
        res.send(error)
    }

})