const upload = require('../../middleware/multer')
const db = require('../../database/connection')

module.exports = ((req,res)=>{
    
    const { filename, path, mimetype, size } = req.file 
    const id = req.params.id

    db.query("UPDATE companies SET filename = ($1), path = ($2) , mimetype = ($3), image_size = ($4) WHERE company_id = ($5) RETURNING *",[
        filename,
        path,
        mimetype,
        size,
        id
    ]).then(response =>{
        res.status(201).send(response.rows[0])
    }).catch(err => {
        res.status(404).send({"error": err})
    })
})