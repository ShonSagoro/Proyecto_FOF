const conexion=require('../../../conectar.js');
import {Arbol, arrayDatos} from '../ArbolBinario/arbol.js';
const lista=document.querySelector('#orden_pedido');
let producto=[];
let arbolPedidos=new Arbol();

//actualizar arbol
const cargarPedido=()=>{
    console.log('entre')
    conexion.query(`SELECT * FROM Pedido`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            let long=rows.length;
            for(let i=0;i<long;i++){
                if(arbolPedidos.buscar_dato(rows[i].nombre_pedido)===null){
                    arbolPedidos.add(rows[i].nombre_pedido,rows[i]);
                }
            }
        }
    });
    setInterval(() => {
        console.log('entre')
        conexion.query(`SELECT * FROM Pedido`,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{
                let long=rows.length;
                for(let i=0;i<long;i++){
                    if(arbolPedidos.buscar_dato(rows[i].nombre_pedido)===null){
                        arbolPedidos.add(rows[i].nombre_pedido,rows[i]);
                    }
                }
            }
        });
    }, 300000);//300000===5 minutos   
}

cargarPedido();

const buscarIdProducto=(idPedido, nombrePedido)=>{
    let elemento=
            `
            <li id="elemento">
                <p class="text">Pedido de: ${nombrePedido} </p>
            `;
    let query=`SELECT *
    FROM Pedido_producto
    INNER JOIN producto
    ON Pedido_producto.producto_id_producto=producto.id_producto WHERE pedido_id_pedido=${idPedido};`;
    conexion.query(query,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            for(let i=0;i<rows.length;i++){
                elemento+=
                `
                    <div class="productoDiv">
                        <p>${rows[i].nombre}</p>
                        <p>|||</p>
                        <p>Cantidad: ${rows[i].cantidad_producto}</p>
                    <div>
                `;
            }
            elemento+=`</li>`;
            lista.insertAdjacentHTML("beforeend",elemento);
        }
    });
    setInterval(() => {
        console.log('entre')
        conexion.query(`SELECT * FROM Pedido`,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{
                let long=rows.length;
                for(let i=0;i<long;i++){
                    if(arbolPedidos.buscar_dato(rows[i].nombre_pedido)===null){
                        arbolPedidos.add(rows[i].nombre_pedido,rows[i]);
                    }
                }
            }
        });
    }, 300000);//300000===5 minutos

}


const agregarLista=()=>{
    //query para que funcione el arbol
    conexion.query(`SELECT * FROM Pedido`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            arbolPedidos.mostrar_PreOrden();
            for(let i=0;i<arrayDatos.length;i++){
                if(arrayDatos[i].estado!=='completado'){
                    buscarIdProducto(arrayDatos[i].id_pedido,arrayDatos[i].nombre_pedido); 
                }
            }            
        }
    });
}

agregarLista();