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

export {listaUsuario};