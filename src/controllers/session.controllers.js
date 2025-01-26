import userModel from "../models/user.models.js"
// SESSION ES UN OBJETO

//consultar 1 usuario
export const loginUser = async (req, res)=> {

    //NUNCA GUARDAD CONTRASEÑA
    const { email, password} = req.body
    const user = await userModel.findOne({email: email})
    try {

        if(user){
            if( password == user.password){  // si la contraseña es igual a la del usuario genero session
                //genero la session de usuario
                req.session.email = user.email
                req.session.rol = user.rol
                req.session.first_name = user.first_name
                req.session.last_name = user.last_name
                req.session.age = user.age
                return res.status(200).send('Usuario logeado')
            }else{
               return res.status(400).send('Contraseña incorrecta')
            }
        }else{
            return res.status(404).send("El usuario no existe")
        }
        //consultar si existe, deberia consultar a la db
       
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }

}

//consultar todos los usuarios
export const register = async (req, res)=> {

    const {first_name, last_name, age, email, password} = req.body
    try {
        // para registros mongoose
        let message = await userModel.create({first_name, last_name, age, email, password})
       
        console.log(message);
        res.status(201).redirect('api/session/viewlogin')

    } catch (error) {
        res.status(500).send(error)
    }
    

}

export const viewLogin  = (req, res) => {
    res.status(200).render('templates/login', {})
}
export const viewsRegister  = (req, res) => {
    res.status(200).render('templates/register', {})
}



