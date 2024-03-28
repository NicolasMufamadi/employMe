const multer = require('multer')

const stotage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/images/')
    },
    filename: function(req,file,cb){
        cb(null,Date.now() +'-'+file.originalname)
    }
})

const upload = multer({storage:stotage})

module.exports = upload