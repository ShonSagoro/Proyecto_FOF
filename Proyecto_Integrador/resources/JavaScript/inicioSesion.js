
class Usuario{
    constructor(correo, usuario, contrasenia, rol){
        this.correo=correo;
        this.usuario=usuario;
        this.contrasenia=contrasenia;
        this.rol=rol;
    }
    //1=cocinero, 2=Vendedor, 3=duenio, 4=reportador?
}

const listaUsuario=[new Usuario("Shon@gmail.com","admin","root",1),
new Usuario("Kristell@gmail.com","Kristell",22709,2),
new Usuario("UnoCrew@gmail.com","Juan",52300,3),
 new Usuario("RegokuDona@gmail.com","Gerardo",93379,4)];

let texto;

const ValidarSesion=()=>{
    let usuario=document.getElementById("txtUser").value;
    usuario=ValidarNombre(usuario, listaUsuario);
    let contrasenia=document.getElementById("txtPass").value;
    contrasenia=ValidarContrasenia(contrasenia,listaUsuario);
    let rol=BuscarRol(usuario, listaUsuario);
    if(usuario!=-1&&contrasenia!=-1){
        document.querySelector('#txtUser').value="";
        document.querySelector('#txtPass').value="";
        if(rol==1){
          //console.log("rol 1");
          window.location.assign("indexInventario.html");
        }else if(rol==2){
            //console.log("rol 2");
            window.location.assign("indexCocinero.html");
        }else if(rol==3){
            //console.log("rol 3");
            window.location.assign("indexReporte.html");
        }else if(rol==4){
            //console.log("rol 4");
            window.location.assign("indexVendedor.html");
        }
    }else{
        texto="El usuario o la contraseña estan incorrectos";
        document.getElementById("validacionInicioSesion").innerHTML=texto;
    }
    
    
}

const BuscarRol=(usuarioV, listaUsuarios)=>{
    for(i=0;i<listaUsuarios.length;i++){
        if(usuarioV==listaUsuarios[i].usuario){
            return listaUsuario[i].rol;
        }
    }
        return -1;

}

const ValidarNombre=(usuarioV, listaUsuarios)=>{
    for(i=0;i<listaUsuarios.length;i++){
        if(usuarioV==listaUsuarios[i].usuario){
            return usuarioV;
        }
    }
        return -1;

}

const ValidarContrasenia=(contrasenia, listaUsuarios)=>{
    for(i=0;i<listaUsuarios.length;i++){
        if(contrasenia==listaUsuarios[i].contrasenia){
            return contrasenia;
        }
    }
    return -1;
}