import Joi from "joi"

const validator =(schema)=>(payload)=> schema.validate(payload,{abortEarly:false});

/* Add Product Validator */
const  addProductSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    metaTitle: Joi.string().min(3).max(30).required(),
    descrip: Joi.string().min(10).required(),
    metaDescrip: Joi.string().min(10).required(),
    status: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    categoryId:Joi.string().required(),
    color:Joi.required(),
    image:Joi.object({
       
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
      }).unknown(),
      images:Joi.array().items(
        Joi.object({
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
        }).unknown()
      )
    //product_image,
    //product_sub_image
});

export default  validator(addProductSchema)
