const conexion=require('../../../conectar.js');
const botonRegistrar=document.querySelector('#btnRegistrar');

const Contador_caracteres=()=>{
    let caracteres=document.getElementById('DescripcionPR').value.length;
    document.getElementById('textarea_count').innerHTML=caracteres+"/250 (Max. 250 caracteres)";
}

// const  listaProducto =new Array();


botonRegistrar.addEventListener('click', ()=>{
    let texto;
    let nombrePR =document.getElementById("NombrePR").value;
    let descripcionPR =document.getElementById("DescripcionPR").value;
    let costoPR =document.getElementById("CostoPR").value;
    if(nombrePR!="" && descripcionPR!=""){
        if(costoPR>0 ){
    //Instrucción SQL
            let query=`INSERT INTO Producto  VALUES (0,'${nombrePR}','${descripcionPR}','${costoPR}')`;
            conexion.query(query, function (err) {
                if (err) {
                    console.log("error en el query");
                    console.log(err);
                    return;
                }else { 
                    document.getElementById("NombrePR").value='';
                    document.getElementById("DescripcionPR").value='';
                    document.getElementById("CostoPR").value='';
                    Contador_caracteres();
                    texto="PRODUCTO REGISTRADO";
                    console.log( "Datos guardados en base de datos");
                }
            });         
            // let Producto={nombrePR,descripcionPR,costoPR};
            // listaProducto.unshift(Producto);
            // console.log(Producto);
            // texto="Producto registrado";
        }else{
            texto="Precio del producto invalido";  
        }

    }else{
         texto="Ingreso de datos invalidos, no se registro";
    } 
    document.getElementById("ValidacionProducto").innerHTML=texto;
});
// const Registro=()=>{
    
// }
    
/* agregarDatos = () =>{
     
var nombre=document.getElementById("nombre").value;
var pass=document.getElementById("contrasena").value;
if(nombre!='' && pass !=''){
    //Instrucción SQL
    $query=`INSERT INTO Gimnasio (usuario,passwords) VALUES ('${nombre}','${pass}')`;
    conexion.query($query, function (err) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        }else { 
            alert ("Datos guardados") 
        }
    });
}else{
    alert("Error: Datos vacíos \nIngrese Datos Válidos")}

    
} */


/*const reiniciar=()=>{
    document.querySelector('NombrePR').value="";
    document.querySelector('escripcionPR').value="";
    document.querySelector('CostoPR').value="";  
}*/