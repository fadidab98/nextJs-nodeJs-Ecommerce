
import {db} from '../../../db/db.js';
/*  roles  controller*/
export const index =(req,res)=>{
    let q = "SELECT * FROM roles ";

    db.query(q,(error,result)=>{
        if(error) return  res.json({status:500,error:error});
        if(result.length == 0) return res.json({status:204,error:'No Content'});

        return res.json({status:200,data:result})
    })
}
export const show =(req,res)=>{
    let q = "SELECT * FROM roles WHERE id = ?";

    db.query(q,[req.params.id],(error,result)=>{
        if(error) return  res.json({status:500,error:error});
        if(result.length == 0) return res.json({status:204,error:'No Content'});

        return res.json({status:200,data:result})
    })
}


export const store=(req,res)=> {
    let q="INSERT INTO roles('name','user_id','permission_id') VALUES(?)";


    db.query(q,[req.body.name,req.body.user_id,req.body.permission_id],(error,result)=>{
        if(error) return  res.json({status:500,error:error});

        return res.json({status:200,message:"Permission Created Successfully"});

    });
}

export const edit=(req,res)=> {
    let q="UPDATE permissions SET name= ?, user_id =? ,permission_id=? WHERE id= ?";


    db.query(q,[req.body.name,req.body.user_id,req.body.permission_id,req.params.id],(error,result)=>{
        if(error) return  res.json({status:500,error:error});

        return res.json({status:200,message:"Role Updated Successfully"});

    });
}

export const destroy=(req,res)=> {
    let q="DELETE FROM roles WHERE id =(?)";


    db.query(q,req.body.roleId,(error,result)=>{
        if(error) return  res.json({status:500,error:error});

        return res.json({status:200,message:"Role Deleted Successfully"});

    });
}