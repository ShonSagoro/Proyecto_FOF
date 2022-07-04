class Usuario{
    constructor(correo, usuario, contrasenia, rol){
        this.correo=correo;
        this.usuario=usuario;
        this.contrasenia=contrasenia;
        this.rol=rol;
    }
    //1=cocinero, 2=Vendedor, 3=duenio, 4=reportador?
    infoUsuario(){
        return "[Usuario: "+this.usuario+", Contrasenia: "+this.contrasenia+", Correo: "+this.correo+", Rol: "+this.rol+".]";
    }
}
export {Usuario};