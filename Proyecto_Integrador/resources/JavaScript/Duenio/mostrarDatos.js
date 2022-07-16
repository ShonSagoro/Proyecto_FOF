const conexion=require('../../../conectar.js');
import {Arbol, arrayDatos} from '../ArbolBinario/arbol.js';
const listaProducto=document.getElementById('listaProductos');
const listaPedidos=document.getElementById('listaPedidos');

let arbolPedidos=new Arbol();
let arbolProductos=new Arbol();
let cantidadTotalProductos=0;
let cantidadPaga=0;

const agregarDatosArbolPedidos=()=>{
    let query=`SELECT * FROM Pedido`;
    conexion.query(query, (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            for(let i=0;i<rows.length;i++){
                if(rows[i].estado==='completado'){
                    arbolPedidos.add(rows[i].nombre_pedido, rows[i]);
                }
            }
            arbolPedidos.mostrar_InOrden();
            for(let i=0; i<arrayDatos.length;i++){
                const productoR=document.createElement('div');
                productoR.textContent=`Pedido de: ${arrayDatos[i].nombre_pedido}|| Costo: $${arrayDatos[i].precio}.00`;
                listaPedidos.append(productoR);
            }
        }

    });
}

const agregarDatosArbolProductos=()=>{
    let query=`SELECT *
    FROM Pedido_producto
    INNER JOIN producto
    ON Pedido_producto.producto_id_producto=producto.id_producto`;
    conexion.query(query,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            for(let i=0;i<rows.length;i++){
                arbolProductos.add(rows[i].nombre, rows[i]);
            }
            arbolProductos.mostrar_InOrden();
            for(let i=0;i<rows.length;i++){
                const productoR=document.createElement('div');
                productoR.textContent=`Producto: ${arrayDatos[i].nombre}|| Cantidad: ${arrayDatos[i].cantidad_producto}`;
                listaProducto.append(productoR);
            }
        }
    });
}

const calcularCantidadProductos=()=>{
    let query=`SELECT * FROM pedido_producto`;
    conexion.query(query,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            for(let i=0;i<rows.length; i++){
                cantidadTotalProductos+=parseInt(rows[i].cantidad_producto);
            }
            document.getElementById('textCantidsadProducto').innerHTML=cantidadTotalProductos;
            cantidadTotalProductos=0;
        }
    });
}

const agregarCantidadPedidos=()=>{
    let query=`SELECT * FROM Pedido`;
    conexion.query(query,(error, rows, fields)=>{
        if(error){
            throw error;    
        }else{
            document.getElementById('textCantidadPedidos').innerHTML=parseInt(rows.length);
            for(let i=0; i<rows.length; i++){
                cantidadPaga+=parseInt(rows[i].precio);
            }
            document.getElementById('txtPrecioG').innerHTML=`$${cantidadPaga}.00`;
            cantidadPaga=0;
        }
    });
}

const obtenerfecha=()=>{
    let date=new Date();    
    let mes=(date.getMonth()<10)? '0'+date.getMonth(): date.getMonth();
    let dia=(date.getDate()<10)?'0'+date.getDate(): date.getDate();
    let fecha=`'${date.getFullYear()}-${mes}-${dia}'`;
}


const main=()=>{
    calcularCantidadProductos();
    agregarCantidadPedidos(); 
    agregarDatosArbolProductos();   
    agregarDatosArbolPedidos();
}

main();