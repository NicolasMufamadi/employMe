const jwt = require('jsonwebtoken');

module.exports = async(req,res,next) => {

    const bearerToken = req.headers.authorization;
    
    if(bearerToken){
        try {
            const token = bearerToken.split(" ")[1];
            
            const decryptedToken = jwt.verify(token,process.env.SECRET)
            if(decryptedToken){
                res.status(200).send({data: decryptedToken});
            }
         //   next();
            
        } catch (error) {
            res.status(401).send({err: "User not authenticated"});
        }
    }else{
        res.status(401).send({err: "User not authenticated"});
    }

}