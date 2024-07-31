const db = require('../../database/connection')

module.exports = (async (req, res) => {
    const address_id = req.params.address_id
    try {
        await db.query("DELETE FROM address WHERE address_id = ($1)",[address_id])
        res.status(200).send({data:"Address Removed!"})
    } catch (error) {
        res.status(500).send(error)
    }
})