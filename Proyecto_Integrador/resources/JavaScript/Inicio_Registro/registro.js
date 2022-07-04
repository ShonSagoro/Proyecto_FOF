const conexion = require('../conectar.js');
const botonRegistro = document.querySelector('#btnRegistro');

botonRegistro.addEventListener('click', ()=>{
    console.log("Entre");
    let correo=document.getElementById("txtCorreoR").value;
    let usuario=document.getElementById("txtUserR").value;
    let contrasenia= document.getElementById("txtPassR").value;
    let contraseniaR= document.getElementById("txtPassRC").value;
    let rol=document.getElementById('rol').value;
    if(correo!='' && usuario!='' && contrasenia!=''){
        if(contrasenia==contraseniaR){
            let query="INSERT INTO Cuenta VALUES ("+0+",'"+usuario+"','"+correo+"','"+contrasenia+"','"+rol+"');";
            conexion.query(query, (error, results, fields)=>{
                if(error){
                    document.getElementById("validacionRegistro").innerHTML="MAL";
                    throw error;
                }
            });
            window.location.assign("index.html");
        }else{
            let texto="Las contraseñas no coiciden, vuelva a intentarlo";
            document.getElementById("validacionRegistro").innerHTML=texto;
        }
    }else{
        document.getElementById("validacionRegistro").innerHTML="LLENE EL FORMULARIO COMPLETO";
    } 
});
