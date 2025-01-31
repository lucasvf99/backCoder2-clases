/**
 * Storage 
        => Almacenar las sesiones en filStorage 
        => npm i session-file-store
        

        cementerio de registros => sessiones que expiraron y no sirven
        si las session se guardan en json local, problema de memoria y seguridad
        mejor guardarlas en mongo atlas
                => seguridad
                => eliminas sessiones inactivas

        Para conectar a mongo 
                        => npm i connect-mongo

        mongoStore y mongoose trabajan en conjunto  
        uno sirve para guardar sessiones y el otro sirve para el modelado de datos 
 * 
 */




//path
import express from 'express'
import path from 'path'
import { __dirname } from './path.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import sessionRouter from './routes/sessions.routes.js'
//importamos session-file-store
// import FileStore from 'session-file-store' 
//importamos connect-mongo
import MongoStore from 'connect-mongo'
import {create} from 'express-handlebars'

 

const app = express()
const PORT = 8080
const hbs = create()

//hacer antes de empezar
// const fileStore = new FileStore(session)
app.use(express.json())

//cookieParse es un middleware
//firmar una cookie(darle seguridad)
app.use(cookieParser('LucasSecret')) // contraseña (firmar cookies)}

//session
app.use(session({
        //Agregamos un nuevo atributo  // trabajamos con fileStorage que es una clase
        //trabaja con 3 atributos, path(carpeta), ttl(time to live), retries(cantidad de veces que el servidor intenta leer ese archivo)
        //crea un archivo json dentro de session, es la data de session
       
        // store: new fileStore({path: './src/sessions', ttl: 60, retries:1}),

        //store para mongo
        store: MongoStore.create({
                //conecto a mi db
                mongoUrl: "mongodb+srv://lucasvf4379:FwKkhXrPcqUrKIoR@cluster0.qqzul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
                mongoOptions: {},
                //ttl, time to live
                ttl: 15
        }),

        secret: 'SessionSecret', // no se copian las sesiones de usuarios       

        //resave => permite mantener la sesion activa
        resave: true,

        //saveUnitialized => permite guardar la session
        //si se deja en false, si el objeto esta vacio no lo guarda
        saveUninitialized: true 
}))

//previo a las rutas
mongoose.connect("mongodb+srv://lucasvf4379:FwKkhXrPcqUrKIoR@cluster0.qqzul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("Db is connected"))
.catch((e) => console.log("Error al conectar db", e))

//handlebars            
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'))//concateno evitando errores de / o     

console.log('Directorio base:', __dirname);
console.log('Directorio de vistas configurado:', path.join(__dirname, 'views'));


//midleware Rutas
app.use('/public', express.static(__dirname + '/public'))//concatenar rutas 
app.use('/api/session', sessionRouter)

app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en el puerto ${PORT}`);
})      

