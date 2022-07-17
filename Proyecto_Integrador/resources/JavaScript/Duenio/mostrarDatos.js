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
                if(rows[i].estado==='completado' || rows[i].estado==='Completado'){
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

const agregarDatosArbolProductos=(producto)=>{
    for(let i=0;i<producto.length;i++){
        let cantidad=0;
        let query=`SELECT *
        FROM Pedido_producto
        INNER JOIN producto
        ON Pedido_producto.producto_id_producto=producto.id_producto WHERE nombre='${producto[i]}'`;
        conexion.query(query,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{
                for(let i=0;i<rows.length;i++){
                    cantidad+=parseInt(rows[i].cantidad_producto);
                }
                let productoArbol={nombre:producto[i], cantidad: cantidad}
                arbolProductos.add(producto[i], productoArbol);
            }
        });
    }
    conexion.query(`SELECT * FROM Pedido`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            arbolProductos.mostrar_InOrden();
            console.log(arrayDatos);
            for(let i=0;i<arrayDatos.length;i++){
                const productoR=document.createElement('div');
                productoR.textContent=`Producto: ${arrayDatos[i].nombre}|| Cantidad: ${arrayDatos[i].cantidad}`;
                listaProducto.append(productoR);
            }
        }
    });
    
}

const agregarDatosProductoArray=()=>{
    let producto=[];
    let query=`SELECT * FROM Producto`;
    conexion.query(query,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            for(let i=0;i<rows.length;i++){
                producto.push(rows[i].nombre);
            }
            agregarDatosArbolProductos(producto);
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
            document.getElementById('txtGanancia').innerHTML=`$${cantidadPaga}.00`;
            cantidadPaga=0;
        }
    });
}

const obtenerfecha=()=>{
    let date=new Date();    
    let mes=date.getMonth();
    let dia=date.getDate();
    let year = date.getFullYear();
    // let fecha=`'${date.getFullYear()}-${mes}-${dia}'`;
    document.getElementById('current_date').innerHTML=(dia + " de " + nombrarMeses[mes] + " del " + year);
}

const nombrarMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const mostrarPerfil=()=>{
    let usuario = localStorage.getItem('usuario').replace(/"/g, "");    //Quitar comillas para dejar solo el nombre del usuario
    document.getElementById('usuario').innerHTML=usuario;

}

const main=()=>{
    calcularCantidadProductos();
    agregarCantidadPedidos(); 
    agregarDatosProductoArray();
    agregarDatosArbolPedidos();
    obtenerfecha();
    mostrarPerfil();
}

main();