import { db } from "../../db/db.js";


/* Dashboard Controller */


export const check =(req,res)=>{
    console.log('user',req.userId)
    let q= "SELECT * FROM users WHERE id = ?";
    db.query(q,req.userId,(error,result)=>{
      if(error) return res.status(500).json({'error':error});
      if(result.length ==0) return (401).json({'error':"unauthorized"})
      console.log(result)
      return res.status(200).json({'message':"authorized",'user':result})
    })
}