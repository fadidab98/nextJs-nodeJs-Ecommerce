import Joi from "joi"

const validator =(schema)=>(payload)=> schema.validate(payload,{abortEarly:false});


const  editProductSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    metaTitle: Joi.string().min(3).max(30).required(),
    descrip: Joi.string().min(10).required(),
    metaDescrip: Joi.string().min(10).required(),
    status: Joi.required(),
    quantity: Joi.required(),
    price: Joi.required(),
    categoryId:Joi.required(),
    color:Joi.required(),
    id:Joi.required(),
    image: Joi.required(),
    //product_sub_image
});

export default  validator(editProductSchema)
