import jwt from 'jsonwebtoken';
import {db} from '../db/db.js';

const SECRET_KEY = 'secret' 

const checkAdmin = (req,res,next)=>{
      try{
        console.log('route product auth admin')
        let token =  req.cookies.access_token;
        let user = jwt.verify(token,SECRET_KEY);
        req.userId = user.id ;
        console.log('checkrole',user.role)
        if(user.role == '1')
          {
           
           
          }else{
            console.log(user.role)
            return res.status(403).json('Forbidden1')
          }
        
            next();
          
             
            /*  
 */

           
      

      }catch(error){
        return res.status(403).json('Forbidden2')


      }
    }
export default checkAdmin