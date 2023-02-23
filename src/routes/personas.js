const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../config');

router.get('/listadopersonas', async (req, res) =>{

    let pool = await sql.connect(config);
    pool.query('SELECT * FROM Usuario1', (error, results, fields) =>{
        if(error){
            console.log("Error: " , error);
            res.send({
                "code" : 400,
                "failed" : "Ha ocurrido un error",
            });
        }else{
            res.render('personas/listadopersonas',{data: results.recordset});

        }
    });


});

router.get('/insertarpersonas', (req, res) =>{
    res.render('personas/insertarpersonas');
});

router.post('/insertarpersonas', async(req, res) =>{
    let pool = await sql.connect(config);
    const {Id_Usuario, Nombre, Direccion,Sexo,Telefono} =req.body;
    var query = "INSERT INTO Usuario1(Id_Usuario, Nombre, Direccion, Sexo, Telefono) VALUES('" + Id_Usuario + "', '" + Nombre + "', '" + Direccion + "', '" + Sexo + "', '" + Telefono + "')";
    pool.request().query(query);
    res.redirect('listadopersonas');
});

router.get('/eliminar/:Id_Usuario', async(req, res)=>{

    const {Id_Usuario} = req.params;
    let pool = await sql.connect(config);
    pool.query("DELETE FROM Usuario1 WHERE Id_Usuario = '" + Id_Usuario + "'");
    res.redirect('/listadopersonas');

});

router.get('/editar/:Id_Usuario',async(req, res)=>{

    const{Id_Usuario} = req.params;

    let pool = await sql.connect(config);
    pool.query("SELECT * FROM Usuario1 WHERE Id_Usuario ='" + Id_Usuario + "' ", (error, results, fields) =>{

        if(error){
            console.log("Error: " , error);
            res.send({
                "code" : 400,
                "failed" : "Ha ocurrido un error",
            });
        }else{
            res.render('personas/editarpersonas',{data: results.recordset[0]});

        }
    });

});

router.post('/editarpersonas/:Id_Usuario',async(req, res)=>{

    const pool = await sql.connect(config);
    const {Id_Usuario} = req.params;
    const {Nombre, Direccion, Sexo, Telefono} = req.body;
    var query = "UPDATE Usuario1 SET Nombre = '" + Nombre + "', Direccion = '" + Direccion + "', Sexo = '" + Sexo + "', Telefono = '" + Telefono + "' WHERE Id_Usuario = '" + Id_Usuario + "'";
    pool.request().query(query);
    res.redirect('/listadopersonas');
}); 

router.get('/listadocita', async (req, res) =>{

    let pool = await sql.connect(config);
    pool.query('SELECT * FROM cita', (error, results, fields) =>{
        if(error){
            console.log("Error: " , error);
            res.send({
                "code" : 400,
                "failed" : "Ha ocurrido un error",
            });
        }else{
            res.render('personas/listadocita',{data: results.recordset});

        }
    });


});

router.get('/ingresarcita', (req, res) =>{
    res.render('personas/ingresarcita');
});

router.post('/ingresarcita', async(req, res) =>{
    let pool = await sql.connect(config);
    const {cedula, fecha, numero_contacto,ips} =req.body;
    var query = "INSERT INTO cita(cedula, fecha, numero_contacto, ips) VALUES('" + cedula + "', '" + fecha + "', '" + numero_contacto + "', '" + ips + "', ')";
    pool.request().query(query);
    res.redirect('listadocita');
});

router.get('/cancelar/:cedula', async(req, res)=>{

    const {cedula} = req.params;
    let pool = await sql.connect(config);
    pool.query("DELETE FROM cita WHERE cedula = '" + cedula + "'");
    res.redirect('/listadocita');

});


module.exports = router;