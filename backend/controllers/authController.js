import mongoose from "mongoose"
import User from "../entities/user.entity.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userRegister = async (req, res)=>{
    //desestructurar el body 
    const {firstName,
        lastName,
        email,
        password,
        isAdmin} = req.body

    //verificar si el usuario existe 
    const vUser = await User.findOne({email: req.body.email})
    if (vUser){
        res.status(400).json({message: "ya existe el usaurio"})
    }else{
    //encriptar el password del body
    const sal = await bcrypt.genSalt(10)
    const bcPassword = await bcrypt.hash(password, sal)
    //crear el nuevo usuario:
    const newUser = await User.create({
        firstName,  
        lastName,
        email,
        password:bcPassword,
        isAdmin
    })
        res.status(201).json(newUser)
    }
}

export const userLogin = async (req,res)=>{
    //desestructurar objeto request
    const{email,password} = req.body
    const user=await User.findOne({email})

    //si el usuario existe comparar ls hash(request,mongo)
    if(user){
        if(await bcrypt.compare(password , user.password)){
            res.status(200).json({
                id: user._id,
                name: user.firstName,
                token: generarToken( user._id)
            })
        }else{
            res.status(404).json({
                "message":"Credenciales invalidas"
            })
        }
    }
}

//funcion que retorne el token 
const generarToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}