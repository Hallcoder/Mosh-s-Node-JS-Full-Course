const Joi=require("joi")

function validateGenre(genre){
    let schema=Joi.object({
        name:Joi.string().min(4).required(),
        isAllowed:Joi.boolean(),
        createDate:Joi.date()
    });
     return schema.validate(genre)
}

module.exports=validateGenre;