import Joi from "joi";

export const userBodyValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empity": "El email no puede estar vacío",
        "any.required": "El email es requerido",
        "string.email": "El email debe ser un email válido"
    }),
    password: Joi.string()
    .min(4)
    .max(40)
    .pattern(new RegExp("^[a-zA-Z0-9]{4,40}$"))
    .required()
    .messages({
        "string.empty": "La contraseña no puede estar vacía",
        "any.required": "La contraseña es requerida",
        "string.pattern.base": "La contraseña debe contener solo letras y números",
        "string.base": "La contraseña debe ser una cadena de texto",
        "string.min": "La contraseña debe tener al menos 4 caracteres",
        "string.max": "La contraseña no debe exceder los 40 caracteres"
    })  
});