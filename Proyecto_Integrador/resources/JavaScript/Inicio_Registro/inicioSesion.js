const conexion = require('../conectar.js');
const btnIniciar= document.querySelector('#BtnIniciar');

btnIniciar.addEventListener('click',()=>{
    let usuario=document.getElementById("txtUser").value;
    buscarCuenta(usuario);
});

const buscarCuenta=(usuario)=>{
    let busqueda="SELECT * FROM Cuenta WHERE usuario='"+usuario+"';"
    conexion.query(busqueda, function (error, rows, fields){
        if(error){
            throw error;
        }
        else{
            if(rows.length!==0){
                let contrasenia=document.getElementById("txtPass").value;
                if(contrasenia===rows[0].contraseña){
                    document.querySelector('#txtUser').value="";
                    document.querySelector('#txtPass').value="";
                    switch (rows[0].rol) {
                        case "Encargado":
                            window.location.assign("indexInventario.html");
                            break;
                        case "Cocinero":
                            window.location.assign("indexCocinero.html");
                            break;
                        case "Dueño":
                            window.location.assign("indexReporte.html");
                            break;
                        case "Vendedor":
                            window.location.assign("indexVendedor.html");
                            break;
                        default:
                            window.location.assign("index.html");
                            break;
                    }
                }else{
                    document.getElementById("validacionInicioSesion").innerHTML="El usuario o la contraseña estan incorrectos";
                }
            }else{
                document.getElementById("validacionInicioSesion").innerHTML="No existe la cuenta";      

            } 
        }
    });
}