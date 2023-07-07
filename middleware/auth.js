const jwt = require('jsonwebtoken');

const auth = async (req,res,next) =>{

    try{
        const token = req.headers.authorization.split(" ")[1]

        let decodedData;

        if(token){

            decodedData = jwt.verify(token,process.env.JWT_SECRET)

            req.userId = decodedData?.id
           
            next();
            
            return
        }

    }catch(error) {
        
        console.log(error)
    }
}

module.exports = auth