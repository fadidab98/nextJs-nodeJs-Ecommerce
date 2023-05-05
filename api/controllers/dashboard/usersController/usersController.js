import { db } from "../../../db/db.js";
import bcrypt from 'bcryptjs';
export const index =(req,res)=>{

    try{
        const page = parseInt(req.query.page) ;
        const limit = 5 ;
        const offset = (page-1) * limit ;
        const q = "SELECT * FROM users WHERE id != ?  limit ? offset ?";

        db.query(q,[req.userId,limit,offset],(err,result)=>{
            if(err) return res.json({'err':err});
            if(result.length == 0) return res.status(204).json('No Category');
             let q = "SELECT count(*) as count FROM users WHERE id != ?";
             db.query(q,[req.userId],(error,data)=>{
                if(error) return res.status(500).json(error);
                const totalPage = Math.ceil(+data[0]?.count / limit)

                return res.status(200).json({
                    "data":result,
                    'count':data,
                   
                    'pagination':{
                        "offset": offset,
                        'totalPage':totalPage,
                        'next':{
                            'page':page+1,
                            'limit':limit
                        },
                        'previous':{
                            'page':page-1,
                            'limit':limit
                        }
    
    
    
                    }
                 });

             })
       
       
            
        })

       
    }catch(error){
        res.status(400).json(error)
    }
        
}


export const routes =(req,res)=>{
    let q = "SELECT id FROM users ";

    db.query(q,(error,result)=>{
        if(error) return res.json({status:500, error:error});
        return res.json({status:200,data:result});
    })
}

export const show=(req,res)=>{

    let q2 = "SELECT * FROM users WHERE id=?";
    db.query(q2,[req.params.id],(error,result)=>{
        if(error) return res.json({status,error:error});
        if(result.length == 0) return res.json({status:204,msg:'No Content'});
        let q = "SELECT group_concat(permissions.name) as permissionName , roles.user_id FROM users INNER JOIN roles ON roles.user_id = users.id INNER JOIN permissions ON permissions.id = roles.permission_id WHERE users.id = ? GROUP BY roles.user_id ";

        db.query(q,[result[0].id],(error,result2)=>{
            if(error) return res.json({status:500,error:error});
            if(result.length == 0) return res.json({status:204,msg:'No Content'});
           const {password,...data} = result[0]
            return res.json({status:200,data:data,permission:result2})
        })

    })

 

}

export const store=(req,res)=>{
   
    
    let q = "INSERT INTO users(name,email,role,password) VALUES (?)";
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    let values = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
        password:hash,
    }
    db.query(q,[Object.values(values)],(error,result)=>{
        if(error) return res.json({status:500,error:error});
        console.log(result)
      

       req.body.permissions.map(permission=>{
            let q = "INSERT INTO roles(user_id,permission_id) VALUES(?)"
            let values = {
                user:result.insertId,
                permission:permission.value

            }
            return db.query(q,[Object.values(values)],(error,result2)=>{
                if(error) return res.json({status:500,error:error})
            })
        })
        return res.status(200).json({status:200,msg:'User Added Successfully'})

    }) 
    }
    


export const destroy=(req,res)=>{
    let q = "DELETE FROM users WHERE id=?";


    db.query(q,req.body.id,(error,result)=>{
        if(error) return res.json({status:500,error:error});
        return res.json({status:200 ,msg:'User Delete Successfully'});
    })
}

export const edit=(req,res)=>{
    let q = "SELECT * FROM users WHERE id = ?";

    db.query(q,[req.params.id],(error,result)=>{
        if(error) return res.json({status:500,error:error});
        if(result.length ==0) return res.json({status:204,msg:'No Content'});
        let q = "UPDATE users SET name=? ,email=? ,role=? WHERE id= ?";
        db.query(q,[req.body.name,req.body.email,req.body.role,result[0].id],(error,result1)=>{
            if(error) return res.json({status:500,error:error});
                let q = "DELETE FROM roles WHERE user_id =? "
                console.log('updated')
                db.query(q,req.params.id,(error,result2)=>{
                    if(error) return res.json({status:500,error:error});
                    console.log('deleted')
                    console.log(req.body.permissions)
                    req.body.permissions?.map(permission=>{
                        let q = "INSERT INTO roles(user_id,permission_id) VALUES(?)"
                        let values = {
                            user:req.params.id,
                            permission:permission.value
            
                        }
                        return db.query(q,[Object.values(values)],(error,result3)=>{
                            if(error) return res.json({status:500,error:error})
                            console.log('inserted')
                        })
                    })
                })
                return res.status(200).json({status:200,msg:'User Updated Successfully'})


        })
    })
}