import { Router } from "express";
import conection from "../conexion.js";
import Swal from "sweetalert2";

let result = ""
const router = Router()

//redireccionamiento

router.get('/iniciarSesion',(req,res)=>{
    res.render('clientes/iniciarSesion')
})

router.get('/registroCliente',(req,res)=>{
    res.render('clientes/registroCliente')
})

//logica direccionamiento

router.post('/iniciarSesion', async (req, res) => {
    try {
        const nombre = req.body.cli_nombre;
        const celular = req.body.cli_celular;
        
        if (nombre && celular) {
            const result = await conection.query('SELECT * FROM cliente WHERE cli_nombre = ?', [nombre]);
            
            if (result.length === 0) {
                res.render('clientes/iniciarSesion',{
                    alert:true,
                    alertTitle:"error",
                    alertMessage:"usuario o contraseña incorrecta",
                    alertIcon:"error",
                    showConfirmButton:true,
                    timer:false,
                    ruta:''
                })
                console.log('Contraseña o usuario incorrecto');
                // Aquí podrías devolver un mensaje al usuario informando sobre la autenticación fallida
            } else {
                console.log('¡Bienvenido!');
                res.render('clientes/iniciarSesion',{
                    alert:true,
                    alertTitle:"Conexion exitosa",
                    alertMessage:"login correcto",
                    alertIcon:"success",
                    showConfirmButton:true,
                    timer:1500,
                    ruta:''
                })
            }
        } else {
            // Manejar el caso en el que no se proporcionaron `nombre` y `celular`
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/registroCliente',async(req,res)=>{
    try{
    const {cli_nombre,cli_celular,cli_celular2} = req.body
    const nuevoCliente = {
        cli_nombre,cli_celular,cli_celular2
    }
    await conection.query('insert into cliente set ?',[nuevoCliente])

    res.redirect('/list')

    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get('/list',async(req,res)=>{
    try{
        await conection.query('select * from cliente',(res,row)=>{
            return result = row
        })
        res.render('clientes/cliente',{clientes:result})

    }catch(err){
        res.status(500).json({message:err.message})
    }
});


export default router