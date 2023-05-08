import {db} from '../../../db/db.js';


export const index=(req,res)=>{
   
    const page = parseInt(req.query.page) ;
    console.log('products',page)
    const limit = 5 ;
    const offset = (page-1) * limit ;
    let q="SELECT users.email,orders.* FROM orders INNER JOIN users ON users.id= orders.user_id"
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