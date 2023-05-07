import Joi from "joi"

const validator =(schema)=>(payload)=> schema.validate(payload,{abortEarly:false});

/* login validation */
const  addUserSchema = Joi.object({
    email: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(10).required(),
    
});

export default  validator(addUserSchema)
