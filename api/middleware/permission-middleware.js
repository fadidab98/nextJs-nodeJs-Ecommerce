
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'secret' 

 const checkPer=(permissionCheck)=>{
    return (req,res,next)=>{

        try{
          console.log('route product permissions admin')
            let token = req.cookies.access_token;
            let user = jwt.verify(token,SECRET_KEY);
            console.log('permissions user',user.role)

            console.log('permission cookie', user.permission )
             if(   user.permission.indexOf(permissionCheck) !==-1 )
             {
                    next();
             }else{
                return res.status(401).json("unauthorized Not Allowed");
    
            }
              
            
            
    
          }catch(error){
            return res.status(401).json("unauthorized");
    
          }
        }

    }
    export default checkPer