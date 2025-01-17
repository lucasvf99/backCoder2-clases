import Router from 'express'
import { loginUser, register, viewLogin, viewsRegister } from '../controllers/session.controllers.js'

const sessionRouter = Router ()

sessionRouter.get('/viewlogin', viewLogin)
sessionRouter.get('/viewregister', viewsRegister)
sessionRouter.post('/login',loginUser )
sessionRouter.post('/register', register)

//minuto 01;11

export default sessionRouter    