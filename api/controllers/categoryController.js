import {db} from '../db/db.js';

export const create=(req,res)=>{
    let q = "INSERT INTO "

}

export const edite=(req,res)=>{

}

/* Show All Category */
export const show=(req,res)=>{
    const q = "SELECT * FROM `categories` WHERE '1'";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        if(data.length == 0) return res.status(204).json("No Category Added");
        return res.status(200).json({data:data});
    })
}

export const destroy=(req,res)=>{

}
