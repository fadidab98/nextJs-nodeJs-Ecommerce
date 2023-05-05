
import {db} from '../../../db/db.js';

export const index =(req,res)=>{
    let q = "SELECT * FROM permissions";

    db.query(q,(error,result)=>{
        if(error) return  res.json({status:500,error:error});
        if(result.length === 0) return res.json({status:206,error:'No Content'});

        return res.json({status:200,data:result})
    })
}
export const show =(req,res)=>{
    let q = "SELECT * FROM permissions WHERE id = ?";

    db.query(q,[req.params.id],(error,result)=>{
        if(error) return  res.json({status:500,error:error});
        if(result.length == 0) return res.json({status:204,error:'No Content'});

        return res.json({status:200,data:result})
    })
}


export const store=(req,res)=> {
    let q="INSERT INTO permissions('name') VALUES(?)";


    db.query(q,req.body.name,(error,result)=>{
        if(error) return  res.json({status:500,error:error});

        return res.json({status:200,message:"Permission Created Successfully"});

    });
}

export const edit=(req,res)=> {
    let q="UPDATE permissions SET name= ? WHERE id= ?";


    db.query(q,[req.body.name,req.params.id],(error,result)=>{
        if(error) return  res.json({status:500,error:error});

        return res.json({status:200,message:"Permission Updated Successfully"});

    });
}

export const destroy=(req,res)=> {
    let q="DELETE FROM permissions WHERE id =(?)";


    db.query(q,req.body.name,(error,result)=>{
        if(error) return  res.json({status:500,error:error});

        return res.json({status:200,message:"Permission Deleted Successfully"});

    });
}
export const showPerById=(req,res)=>{
    let q = "SELECT permissions.id , permissions.name FROM roles INNER JOIN permissions ON roles.permission_id = permissions.id WHERE roles.user_id = ?";
    db.query(q,req.params.id,(error,result)=>{
        if(error) return res.json({status:500,error:error});
        return res.json({status:200,data:result})
    })
}