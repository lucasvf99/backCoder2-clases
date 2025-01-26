/**
 * hashSync => 
 * compareSync => 
 * genSaltSync => (10) por defecto, mas alto el numero mayor seguridad
 */

import {hashSync, compareSync, genSaltSync} from 'bcrypt'

//encriptar contraseña 
export const createHash = (password) => hashSync (password, genSaltSync(5))

//validamos contraseña ingresada
export const validatePassword = (passIngresada, passBDD) => compareSync(passIngresada, passBDD)  

const passE = createHash('coderhouse')
console.log(passE)
console.log(validatePassword('coderhouse', passE));
