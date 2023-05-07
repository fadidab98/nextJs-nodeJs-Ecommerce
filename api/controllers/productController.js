import {db} from '../db/db.js';
/* FrontEnd : product controller  */
export const create=(req,res)=>{

}

export const edit=(req,res)=>{

}
/* Show All Products BY Category Id */
export const show=(req,res)=>{
    try{
       
        const q = "SELECT * FROM categories WHERE id = ?"
        const id = req.params.id;

        db.query(q,[id],(err,result)=>{
            if(err) return res.json({'err':err});
            if(result.length == 0) return res.status(204).json('No Category');
            const page = parseInt(req.query.page) ;
            const limit = 9 ;
            const offset = (page-1) * limit  ;  //temp

            const {id,category_title,category_image,status,category_description,...result1} = result[0]

             const q = "SELECT products.id,products.product_title,products.product_price,products.category_id,products.product_image,products.product_sub_image FROM products JOIN categories ON categories.id = products.category_id WHERE products.status = '1' AND products.category_id = ? limit ? offset ?";
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
            
            })
        })

       
    }catch(error){
        res.status(400).json(error)
    }
       
}

export const destroy=(req,res)=>{

}
export const productDetails=(req,res)=>{
   const q = "SELECT * FROM products WHERE id =? ";
   const id = req.params.id;

    db.query(q,[id],(err,data)=>{
        if(err) return res.json({'error':err});
        if(data.length == 0 ) return res.status(204).json({'message':"No Data Added"});
        return res.status(200).json({"data":data})
    })
}



export const index =(req,res)=>{
    const q = "SELECT products.id FROM products";
    db.query(q,(err,result)=>{
        if(err) return res.json({"err":err});
        if(result.length == 0) return res.status(204).json({'message':"No Product Added"});
        return res.status(200).json({
            'data':result
        })
    
    });
}
export const filter=(req,res)=>{
    let brand = req.body.brand;
    let price = req.body.price;
    let color = req.body.color;
    var prices ='';
    var colors ='';

    console.log(brand)
    if(price.length >0)
    {
        for(let i=0 ; i<price.length; i++)
        {
            if(i == price.length -1)
            {
                prices += `product_price=${price[i].replace('-','>=')}`
            }else{
                prices += `product_price=${price[i].replace('-','>=')} OR `
            }
            
        } 
    }
    if(color.length >0)
    {
        for(let i=0 ; i<color.length; i++)
        {
            if(i == color.length -1)
            {
                colors += `color='${color[i]}' `
            }else{
                colors += `color='${color[i]}' OR `
            }
            
        } 
    }
    let statment =`${color.length >0 ? colors :''} ${price.length>0? 'OR '+ prices :''}`;

   let q = `SELECT * FROM products WHERE ${statment} `;
 
    db.query(q,(error,result)=>{
        if(error) return res.json({status:500,error:error});
        if(result.length ==0) return res.json({status:204,msg:'No Content'});
        return res.json({status:200,data:result})
    })
    

}
