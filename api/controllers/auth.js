import {db} from '../db/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validationAddUser from './registerValidation.js';
import validationLoginUser from './loginValidation.js'
export const register=(req,res)=>{
    
    const {error}=validationAddUser(req.body)
    if(error)
    {
      console.log('Error Start')
      return res.json({'status':403,error}) 
    }
    else{
      const q ="SELECT * FROM users WHERE email = ? ";
      console.log('register start')

      db.query(q,[req.body.email],(err,data)=>{
          if(err) return res.json(err);
          if(data.length) return res.json({status:409, msg:'User already exists'});
  
          // hash the password and create user
  
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.password,salt);
          const q = "INSERT INTO users(`name`,`email`,`role`,`password`) VALUES (?)";
          const values ={
              name:req.body.name,
              email: req.body.email,
              role:'0',
              password:hash
          };
          db.query(q,[Object.values(values)],(err,result)=>{
              if(err) return console.log(err)
              const {password,...data1}= values;
              console.log('user',data1);
              const accessToken = jwt.sign({id:result.insertId,role:data1.role},"secret",{expiresIn: "15m"});
              const refreshToken = jwt.sign({id:result.insertId,role:data1.role},"secretrefresh",{expiresIn: "2d"});

              let findTokenQuery = "SELECT * FROM userToken WHERE user_id = ?";
                  db.query(findTokenQuery, [result.insertId], (err, data) => {
                    if (err) return res.json(err);
                    // find any refresh token conatined with given
            
                    if (data.length > 0) {
                      // remove existing token
                      let delTokenQuery = "DELETE FROM userToken WHERE user_id = ?";
                      db.query(delTokenQuery, [result[0].id], (err, data1) => {
                        if (err) throw err;
                        console.log("Existing token removed");
                      });
                    }
                    // Add new Token to database
                    let insertTokenQuery =
                      "INSERT INTO userToken (`user_id`, `token`) VALUES (?)";
                    let values = [result.insertId, refreshToken];
                    db.query(insertTokenQuery, [values], (err, data) => {
                      if (err) throw err;
                      console.log("new Token Added");
                    });
                  });
              console.log("token", accessToken)
              res.json({msg:"loged in successfully",status:200,data:data,access_token:accessToken,refreshToken:refreshToken});
          })
  
      });
    }
 
}
export const login= (req,res)=>{
  const {error} = validationLoginUser(req.body);
   if(error)
   {
    return res.json({status:409,error})
   }
   else{
    let q = 'SELECT * FROM users WHERE email = ?';
    const email =req.body.email;
    const passwordFront =req.body.password;
    console.log(email)
    db.query(q,[email], async(error,result)=>{
        if(error) return res.status(500).json(error);
        if(result.length == 0) return res.status(400).json('Error');
           
         
        const checkPassword = await bcrypt.compare(passwordFront,result[0].password);
        console.log('checkpassword',checkPassword)
        console.log('frontpassword',passwordFront)
        console.log('backpassword',result[0].password)


         const {password,...data}= result[0]; //remove password
        if(!checkPassword)
        {
            return res.json({status:401,msg:'incorrect password'});

        }
        else{
            
            let q ="SELECT permissions.name FROM roles  INNER JOIN permissions ON permissions.id= roles.permission_id WHERE roles.user_id = ?"
           
            db.query(q,result[0].id,(error,permissions)=>{
                if(error) return res.status(500).json(error);
           
                const accessToken = jwt.sign({id:data.id,role:data.role,permission:permissions.map(i=>i.name)},"secret",{expiresIn: "15m"});
                const refreshToken = jwt.sign({id:data.id,role:data.role,permission:permissions.map(i=>i.name)},"secretrefresh",{expiresIn: "2d"});

                  let findTokenQuery = "SELECT * FROM userToken WHERE user_id = ?";
                  db.query(findTokenQuery, [result[0].id], (err, data) => {
                    if (err) return res.json(err);
                    // find any refresh token conatined with given
            
                    if (data.length > 0) {
                      // remove existing token
                      let delTokenQuery = "DELETE FROM userToken WHERE user_id = ?";
                      db.query(delTokenQuery, [result[0].id], (err, data1) => {
                        if (err) throw err;
                        console.log("Existing token removed");
                      });
                    }
                    // Add new Token to database
                    let insertTokenQuery =
                      "INSERT INTO userToken (`user_id`, `token`) VALUES (?)";
                    let values = [result[0].id, refreshToken];
                    db.query(insertTokenQuery, [values], (err, data) => {
                      if (err) throw err;
                      console.log("new Token Added");
                    });
                  });
               
               
               
               
               
               
                  res.status(200).json({msg:"loged in successfully",status:200,data:data,permission:permissions.map(i=>i.name),access_token:accessToken,refreshToken:refreshToken});
        
            })         
        }
    })

   }
  
   
}
export const checkAuth =(req,res)=>{
    console.log(req.userId)
    let q= "SELECT * FROM users WHERE id = ?";
    db.query(q,req.userId,(error,result)=>{
      if(error) return res.status(500).json({'error':error});
      if(result.length ==0) return (401).json({'error':"unauthorized"})
      console.log(result)
      return res.status(200).json({'message':"authorized",'user':result})
    })
}

export const refresh=(req,res)=>{
try{


    const refreshTokenold = req.body.refreshToken;
    console.log('userid refresh 1', req.body.refreshToken);
    let q ="SELECT * FROM userToken WHERE token = ?";
    console.log('userid refresh 1');
    db.query(q,refreshTokenold,(error,result)=>{
        if(error) return res.json({status:500,error:error});
             const data = jwt.verify(refreshTokenold,'secretrefresh');
            console.log('userid refresh',data.id);
            console.log('userid refresh 2');
            if(!data)
            {
                return res.status(401).json('unAutherized')
            }
            let q ="SELECT permissions.name FROM roles  INNER JOIN permissions ON permissions.id= roles.permission_id WHERE roles.user_id = ?"
           
            db.query(q,data.id,(error,permissions)=>{
                if(error) return res.status(500).json(error); 
                const accessToken = jwt.sign({id:data.id,role:data.role,permission:permissions.map(i=>i.name)},"secret",{expiresIn: "15m"});
            const refreshToken = jwt.sign({id:data.id,role:data.role,permission:permissions.map(i=>i.name)},"secretrefresh",{expiresIn: "2d"});
         
            let findTokenQuery = "SELECT * FROM userToken WHERE user_id = ?";
            db.query(findTokenQuery, [data.id], (err, data1) => {
              if (err) return res.json(err);
              // find any refresh token conatined with given
      
              if (data1.length > 0) {
                // remove existing token
                let delTokenQuery = "DELETE FROM userToken WHERE user_id = ?";
                db.query(delTokenQuery, [data.id], (err, data1) => {
                  if (err) throw err;
                  console.log("Existing token removed" ,data1);
                });
              }
              // Add new Token to database
              let insertTokenQuery =
                "INSERT INTO userToken (`user_id`, `token`) VALUES (?)";
                    let values={user_id:data.id,token:refreshToken}
              db.query(insertTokenQuery, [Object.values(values)], (err, data) => {
                if (err) throw err;
                console.log("new Token Added");
                              return  res.status(200).json({msg:"refresh  successfully",permission:permissions.map(i=>i.name),access_token:accessToken,refreshToken:refreshToken});

              });
            });
         
           

            
            })
        
    });

    

}catch(error){
    return res.status(401).json('unAutherized')

}
    

}

export const logout=(req,res)=>{
  try{
    const refresh = req.cookies.refreshToken;

    let q ="SELECT * FROM userToken WHERE token = ?";
    console.log('userid refresh 1');
    db.query(q,refresh,(error,result)=>{
        if(error) return res.json({status:500,error:error});
             const data = jwt.verify(refresh,'secretrefresh');
            console.log('userid refresh',data.id);
            console.log('userid refresh 2');
            if(!data)
            {
                return res.status(401).json('unautherized')
            }
            let delTokenQuery = "DELETE FROM userToken WHERE user_id = ?";
            db.query(delTokenQuery,data.id,(error,result)=>{
              if(error) return res.json({status:500,error:error});
              return res.json({status:200,msg:'Logout Successfully'});
            })

          })

  }catch(error){
    return res.status(401).json('unautherized')
  }

}