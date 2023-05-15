import {db} from '../../../db/db.js';


export const index=(req,res)=>{
   
    const page = parseInt(req.query.page) ;
    console.log('products',page)
    const limit = 5 ;
    const offset = (page-1) * limit ;
    let q="SELECT users.email,orders.* FROM orders INNER JOIN users ON users.id= orders.user_id  limit ? offset ?"
    console.log('Hallo From Order Controller')
    db.query(q,[limit,offset],(err,result)=>{
        if(err) return res.json({'err':err});
        if(result.length == 0) return res.status(204).json('No Category');
         let q = "SELECT count(*) as count FROM orders";
         db.query(q,(error,data)=>{
            if(error) return res.status(500).json(error);
            const totalPage = Math.ceil(+data[0]?.count / limit)
            console.log('Hallo From Order Controller',totalPage)
            console.log('Hallo From Order Controller',result)
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

} 
export const ordersId=(req,res)=>{
    let q="SELECT id FROM orders";
    db.query(q,(error,result)=>{
        if(error) return res.json({status:500,msg:id})
        if(result.length ==0) return res.json({status:204,msg:'No Content'})
        return res.json({status:200,data:result})  
    })
}
export const show=(req,res)=>{
    let q ="SELECT orders.*,order_details.phone,order_details.payment_method,order_details.country,order_details.currency,order_details.orderId,users.email FROM orders INNER JOIN order_details ON orders.id=order_details.orderId INNER JOIN users ON users.id=orders.user_id WHERE orders.id=?";
    const id= req.params.id
    db.query(q,id,(error,result)=>{
        if(error) return res.json({status:500,msg:error})
        if(result.length ==0) return res.json({status:204,msg:'No Content'});
        return res.json({status:200,data:result})
    })
}
export const showArrayProducts=(req,res)=>{
    const products = JSON.parse(req.params.products)
    console.log( products)
    let q =`SELECT * FROM products WHERE  id IN (${products.join(',')})`
    db.query(q,(error,result)=>{
        if(error) return res.json(error);
        if(result.data == 0) return res.json({status:204,msg:'No Content'})
        return res.json({status:200,data:result})
    })
}