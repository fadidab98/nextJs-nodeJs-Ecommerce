import { db } from "../../../db/db.js";
import validateAddProduct from './validation/validation.js';
import validateEditProduct from './validation/editValidation.js'
import dataUri from "../../../service/datauri.js";

import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name:'dg2c3liap',
  api_key:'195745443437264',
  api_secret:'XzlRSZl_H2DaGio9H9Xj3HOS8Wc'
});


export const index =(req,res)=>{

    try{
        const page = parseInt(req.query.page) ;
        console.log('products',page)
        const limit = 5 ;
        const offset = (page-1) * limit ;
        const q = "SELECT products.*,categories.category_title FROM products INNER JOIN categories ON categories.id = products.category_id limit ? offset ?";

        db.query(q,[limit,offset],(err,result)=>{
            if(err) return res.json({'err':err});
            if(result.length == 0) return res.status(204).json('No Category');
             let q = "SELECT count(*) as count FROM products";
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
       
       
            
        })

       
    }catch(error){
        res.status(400).json(error)
    }
        
}

export const store = async(req,res)=>{

    const image = JSON.stringify(req.files.image)
    const convert = JSON.parse(image)
    const data = Object.assign(req.body,   { image: convert[0] } )
    const images = JSON.stringify(req.files.images);
    const conver_Images = JSON.parse(images);
    const AllData = Object.assign(data,{'images':conver_Images}) 
    
    const {error} = validateAddProduct(AllData);
    if(error)
    {
      
        return res.json(error)

    }else{
        console.log('image2',req.files.image)
        let q = "INSERT INTO products(product_title,product_meta_title,product_description,product_meta_description,quantity,product_price,status,category_id,color,product_image,product_sub_image) VALUES (?)"
        
        const file64 = dataUri(req.files.image[0]);
        
        const uploadResult = await cloudinary.uploader.upload(file64.content);
        

        console.log('images', req.files.images.length);

        
        const uploadImage =async()=>{
            const prom = req.files.images.map(image=>cloudinary.uploader.upload(dataUri(image).content));
            const results = await Promise.all(prom)
            const imageUrls = results.map((result) => result.secure_url);
            const colors= JSON.parse(req.body.color).map(color=>color.value)
           
            console.log('parsedImage',imageUrls)
            const imageUrlsArray =JSON.stringify(imageUrls)
            
            const values={
                 product_title:req.body.title,
                 product_meta_title:req.body.metaTitle,
                 product_description:req.body.descrip,
                 product_meta_description:req.body.metaDescrip,
                 quantity:req.body.quantity,
                 product_price:req.body.price,
                 status:req.body.status,
                 category_id:req.body.categoryId,
                 color:colors.toString(),
                 product_image: uploadResult.secure_url.toString(),
                 product_sub_image: imageUrlsArray
     
             }
             
             db.query(q,[Object.values(values)],(error,data)=>{
                 if(error) return res.json({status:500,error:error})
                 return res.status(200).json({status:200,success:'Product Added Successfully'});
             })
        }
        uploadImage()
      
       
    } 
}



export const destroy=(req,res)=>{
    let q = "SELECT * FROM products WHERE id =?";

    db.query(q,req.body.id,(error,result)=>{
        if(error) return res.json({status:500,error:error});
        if(result.length == 0 ) return res.json({status:206,error:'No Content'});
        let q = "DELETE FROM products WHERE id =?";
        db.query(q,req.body.id,(error,data)=>{
            if(error) return res.json({status:500,error:error});
            return res.json({status:200,message:'Category Deleted Successfully'})
        })
    })
}



export const allRoutes=(req,res)=>{
    let q = "SELECT products.id FROM products";

    db.query(q,(error,result)=>{
        if(error) return res.json({status:500,error:error});
        return res.json({status:200,data:result})
    })
}


export const show=(req,res)=>{
    let q = "SELECT products.*, categories.category_title   From products INNER JOIN categories ON categories.id =products.category_id  WHERE products.id =?";
    db.query(q,req.params.id,(error,result)=>{
        if(error) return res.json({status:500,error:error});
        if(result.length ==0) return res.json({status:206,error:'No Content'});

        return res.json({status:200,data:result});
    })
}


export const edit =(req,res)=>{

    const {error} = validateEditProduct(req.body);

    if(error)
    {
        return res.json(error)
    }else{
        let q = "SELECT * FROM products WHERE id =?";
        db.query(q,req.params.id,(error,result)=>{
            if(error) return res.json({status:500,error:error});
            if(result.length == 0 ) return res.json({status:206,error:'No Content'});
    
            let q = "UPDATE products SET  product_title=? , product_meta_title = ?, product_description = ?, product_meta_description = ?, quantity = ?, product_price = ?, status = ?, category_id = ?, color = ? WHERE id =?"
            const colors= req.body.color.map(color=>color.value)
    
            db.query(q,[req.body.title,req.body.metaTitle,req.body.descrip,req.body.metaDescrip,req.body.quantity,req.body.price,req.body.status,req.body.categoryId,colors.toString(),req.params.id],(error,data)=>{
                if(error) return res.json({status:500,error:error});
                return res.json({status:200,message:'Product Updated Successfully'})
            })
        })
    }
 
}