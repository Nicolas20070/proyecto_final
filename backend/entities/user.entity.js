import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        require:[true,"Nombre requerido"]
    },
    lastName:{
        type: String,
        require:[true,"Apellido requerido"]
    },
    email:{
        type: String,
        require:[true,"Nombre de usuario requerido"],
        unique: [true,"Nombre de usuario ya esta en uso"]
    },
    password:{
        type: String,
        require:[true,"Nombre de usuario requerido"]
    },
    isAdmin:{
        type:Boolean,
        require:[true,"isAdmin es requerido"],
        default:false
    }
},
{
    timestamps:true
}
)

const User = mongoose.model("User",UserSchema)

export default User 