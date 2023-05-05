import { db } from "../../../db/db.js";

 import validateAddCategory from './validation/validation.js';
 import validateEditCategory from './validation/editValidation.js'


export const index =(req,res)=>{

    try{
        const page = parseInt(req.query.page) ;
        const limit = 5 ;
        const offset = (page-1) * limit ;
        const q = "SELECT * FROM categories  limit ? offset ?";

        db.query(q,[limit,offset],(err,result)=>{
            if(err) return res.json({'err':err});
            if(result.length == 0) return res.status(204).json('No Category');
             let q = "SELECT count(*) as count FROM categories";
             db.query(q,(error,data)=>{
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
       
         /*    const {id,category_title,category_image,status,category_description,...result1} = result[0]

             const q = "SELECT products.id,products.product_title,products.product_price,products.category_id FROM products JOIN categories ON categories.id = products.category_id WHERE products.status = '1' AND products.category_id = ? limit ? offset ?";
            db.query(q,[id,limit,offset],(err,data)=>{
             if(err) return res.json(err);
             if(data.length == 0) return res.status(200).json({"message":'No Data Added',"meta":result1})
             const q = "SELECT count(*) as count FROM products WHERE status = '1' AND category_id=?";
             db.query(q,[id],(err1,data1)=>{
                if(err1) return res.status(500).json(err1);
                const totalPage = Math.ceil(+data1[0]?.count /limit)
                return res.status(200).json({
                    "data":data,
                    'count':data1,
                    "meta":result1,
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
             */
            
        })

       
    }catch(error){
        res.status(400).json(error)
    }
        
}


export const store=(req,res)=>{
    const {error} = validateAddCategory(req.body)
    if(error){
        return res.json(error)
    }
    else{
        let q = "INSERT INTO categories (category_title,category_meta_title,category_description,category_meta_description,status) VALUES (?)";
    
        const values={
            category_title: req.body.category_title,
            category_meta_title: req.body.category_meta_title,
            category_description: req.body.category_description,
            category_meta_description: req.body.category_meta_description,
            status: req.body.status,

        }
        db.query(q,[Object.values(values)],(error,result)=>{
            if(error) return res.status(500).json({status:500,message:error});
            
            return res.status(200).json({status:200, success:'Category Added Successfully'})
        })
    }
}


/* Routes */


export const routes =(req,res)=>{
    let q = "SELECT categories.id FROM categories ";

    db.query(q,(error,result)=>{
        if(error) return res.json({status:500,error:error});
        return res.json({status:200,data:result})
    })
}

/* show category */

export const show=(req,res)=>{
    console.log(req.params.id)
    let q = "SELECT count(products.id) as CountProducts ,categories.* FROM categories INNER JOIN products ON products.category_id = categories.id WHERE categories.id=?";
    db.query(q,req.params.id,(error,result)=>{
        if(error) return res.json({status:500,error:error})
        if(result.length ==0) return res.json({status:206,error:'No Content'})

    return res.json({status:200,data:result})    
    })
}

export const destroy=(req,res)=>{
    let q = "SELECT * FROM categories WHERE id =?";
        console.log('cat',req.body.id)
    db.query(q,req.body.id,(error,result)=>{
        if(error) return res.json({status:500,error:error});
        if(result.length == 0 ) return res.json({status:206,error:'No Content'});
        let q = "DELETE FROM categories WHERE id =?";
        db.query(q,req.body.id,(error,data)=>{
            if(error) return res.json({status:500,error:error});
            return res.json({status:200,message:'Category Deleted Successfully'})
        })
    })
}
export const edit =(req,res)=>{
    const {error} = validateEditCategory(req.body);
    if(error)
    {
        return res.json(error)
    }
    else{
        let q = "SELECT * FROM categories WHERE id =?";
        db.query(q,req.params.id,(error,result)=>{
            if(error) return res.json({status:500,error:error});
            if(result.length == 0 ) return res.json({status:206,error:'No Content'});
    
            let q = "UPDATE categories SET  category_title=? ,category_meta_title = ?,category_description = ?,category_meta_description = ? ,status =? WHERE id =?"
    
            db.query(q,[req.body.category_title,req.body.category_meta_title,req.body.category_description,req.body.category_meta_description,req.body.status,req.params.id],(error,data)=>{
                if(error) return res.json({status:500,error:error});
                return res.json({status:200,message:'Product Updated Successfully'});
            })
        })
    }
    
}