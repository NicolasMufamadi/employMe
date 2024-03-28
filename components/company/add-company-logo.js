const upload = require('../../middleware/multer')
const db = require('../../database/connection')

module.exports = ((req,res)=>{
    
    const { filename, path, mimetype, size } = req.file 

    db.query("INSERT INTO company_logos(company_id,filename,filepath,mimetype,image_size) VALUES($1,$2,$3,$4,$5) RETURNING *",[
        req.body.company_id,
        filename,
        path,
        mimetype,
        size
    ]).then(response =>{
        res.status(201).send(response.rows[0])
    }).catch(err => {
        res.status(500).send({"error": err})
    })
})