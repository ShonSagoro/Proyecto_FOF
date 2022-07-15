const conexion=require('../../../conectar.js');
import {Arbol, arrayDatos} from '../ArbolBinario/arbol.js';
// class Producto{
//     constructor(id,nombre, descripcion, costo){
//         this.id=id;
//         this.nombre=nombre;
//         this.descripcion=descripcion;
//         this.costo=costo
//     }
//     infoProducto(){
//         return "[Nombre: "+this.nombre+"; Descripcion: "+this.descripcion+"; Costo: $"+this.costo+"]";
//     }
// }
const botonBuscar=document.querySelector('#buscarProducto');
let arbolProducto= new Arbol();
const lista=document.getElementById('lista_productos');
const contenedorProductos=document.getElementById('Section_Producto');



const mostrarListaProductos=()=>{
    contenedorProductos.innerHTML='';
    conexion.query('SELECT * FROM Producto', (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            let long= rows.length
            for(let i=0; i<long; i++){
                arbolProducto.add(rows[i].nombre, rows[i]);
            }
            arbolProducto.mostrar_InOrden();
            console.log(arrayDatos);
            for(let i=0; i<long; i++){
                const productoR=document.createElement('div');
                productoR.textContent=arrayDatos[i].nombre;
                contenedorProductos.append(productoR);
                //prepend coloca antes del final ||append coloca al final
            }
        }   
    });
    
}

botonBuscar.addEventListener('click',()=>{  
    let nombreBuscar=document.getElementById('BuscarTxt').value;
    if(nombreBuscar!==''){
        buscarProducto(nombreBuscar);
    }else{
        vaciarDatos();
        console.log("estoy vacio, soy el Hollow Knight");
    }
});

const buscarProducto=producto=>{
    // producto=producto.toLowerCase();
    conexion.query("SELECT * FROM Producto WHERE nombre='"+producto+"'", (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows!==undefined){
                document.getElementById('txtDescripcionB').innerHTML=rows[0].descripcion;
                document.getElementById('txtPrecioB').innerHTML="$"+rows[0].costo+".00";
            }else{
                document.getElementById('txtDescripcionB').innerHTML="NO EXISTE EL PRODUCTO";
            }
    }
    });
}

const vaciarDatos=()=>{
    document.getElementById('txtDescripcionB').innerHTML='';
    document.getElementById('txtPrecioB').innerHTML='';
}


mostrarListaProductos();

contenedorProductos.addEventListener('click', (e)=>{
    console.log(e.target);
    buscarProducto(e.target.textContent);
});