import pkg from 'colors'
const { colors } = pkg;
import express from 'express'
import  dotenv from 'dotenv'
import pruebaRouter from './routes/pruebaRoutes.js';
import authRouter from './routes/authRouter.js';
import connectDB from './config/db.js';

//leer del .env 
dotenv.config()
connectDB()

//crear el objeto aplicacion de expresion 
const app = express()

app.use(express.json())
const PORT = process.env.PORT

app.use('/api/pruebas', pruebaRouter)

app.use('/api/auth', authRouter)

//configurar app para que acepte body en json


//crear servidor express
app.listen(PORT,()=>{
    console.log(`Servidor Ejecutando en el puerto: ${PORT}`.bgGreen.red.bold)
})
