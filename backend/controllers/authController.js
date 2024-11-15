import mongoose from "mongoose"
import User from "../entities/user.entity.js"
import bcrypt from 'bcrypt'

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

export const userLogin = (req,res)=>{
    res.send("inicio de ususariosss")

}