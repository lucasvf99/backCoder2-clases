import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    rol:{
        type:String,
        default: 'Usuario'
    }
})

const userModel = model('users', userSchema)

export default userModel