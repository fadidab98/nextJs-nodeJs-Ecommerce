import Joi from "joi"

const validator =(schema)=>(payload)=> schema.validate(payload,{abortEarly:false});

/* Add Category Validator */
const  addCategorySchema = Joi.object({
    category_title: Joi.string().min(3).max(30).required(),
    category_meta_title: Joi.string().min(3).max(30).required(),
    category_description: Joi.string().min(10).required(),
    category_meta_description: Joi.string().min(10).required(),
    status: Joi.required()
});

export default  validator(addCategorySchema)
