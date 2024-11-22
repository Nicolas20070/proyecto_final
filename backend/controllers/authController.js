import mongoose from "mongoose"
import User from "../entities/user.entity.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userRegister = async (req, res) => {
    const { firstName, lastName, email, password, isAdmin } = req.body;
    
    const vUser = await User.findOne({ email: req.body.email });
    if (vUser) {
        return res.status(400).json({ message: "Ya existe el usuario" });
    } else {
        const sal = await bcrypt.genSalt(10);
        const bcPassword = await bcrypt.hash(password, sal);
        
        const newUser = await User.create({
            firstName,  
            lastName,
            email,
            password: bcPassword,
            isAdmin
        });
        
        const token = generarToken(newUser._id);

        res.status(201).json({
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: token
        });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            res.status(200).json({
                id: user._id,
                name: user.firstName,
                token: generarToken(user._id)
            });
        } else {
            res.status(404).json({
                message: "Credenciales inválidas"
            });
        }
    } else {
        res.status(404).json({
            message: "Usuario no encontrado"
        });
    }
};

const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};
