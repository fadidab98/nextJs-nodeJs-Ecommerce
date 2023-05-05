import jwt from 'jsonwebtoken';
import {db} from '../db/db.js';

const SECRET_KEY = 'secret' 

const auth = (req,res,next)=>{
      try{
        console.log('route product auth middleware admin')
        let token =  req.cookies.access_token;
        console.log('auth cookie middleware',token)
        if(token)
        {
          
              let user = jwt.verify(token,SECRET_KEY);
              req.userId = user.id ;
              console.log(user.id)

           


        }
        else{
            return res.status(401).json("unauthorized");

        }
        next();

      }catch(error){
        return res.status(401).json("unauthorized");

      }
    }
export default auth