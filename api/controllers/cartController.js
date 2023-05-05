import { db } from "../db/db.js";



export const index=(req,res)=>{
    let q= "SELECT products.*,cart.quantity,cart.id AS categoryId FROM cart INNER JOIN products ON products.id = cart.product_id WHERE  cart.user_id = ?"
   console.log('userId From cart ', req.userId)
    db.query(q,req.userId,(error,result)=>{
        if(error)return res.status(500).json(error);
        if(result.length ==0 ) return res.status(204).json({'message':"Empty Cart"});
        return res.status(200).json({'data':result})
    })
  
}


export const add=(req,res)=>{
    let q = "SELECT * from products WHERE id=? " //find product
    db.query(q,req.body.product,(error,data)=>{
        if(error) return res.status(500).json(error); // error in sql
        if(data.length ==0) return res.status(204).json({"message":"Error Product"}); // no product in product list
        

        let q1= "INSERT INTO cart (user_id,product_id,quantity) VALUES (?)";
        const values = {
            user:req.userId,
            product:req.body.product,
            quantity:1
        }
        console.log(values)
    
        db.query(q1,[Object.values(values)],(error,result)=>{
            if(error) return res.status(500).json(error); // error in sql
            
    
    
            return res.status(200).json({"message":'success'})   //successfully
        })

})


    

}
export const destroy=(req,res)=>{
    let q = "SELECT * FROM products WHERE id=?"; //check product
    console.log(req.body)
    const product = req.body.product
    db.query(q,product,(error,result)=>{
        if(error) return res.status(500).json(error);
        let q1 = "DELETE FROM cart WHERE id =? AND user_id =?";
        const cart = req.body.cart;
        const user = req.userId;
        db.query(q1,[cart,user],(error,result)=>{
            if(error) return res.status(500).json(error);
            return res.status(200).json({'message':"Item Deleted Successfully"});
        })
    })


   

}

export const count=(req,res)=>{
    
    let q = "SELECT  product_id FROM cart WHERE user_id= ?";
    db.query(q,req.userId,(error,result)=>{
        if(error) return res.json({status:500,error:error});
        return res.json({status:200,data:result});
    })
}