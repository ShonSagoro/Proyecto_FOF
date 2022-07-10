const conexion=require('../../../conectar.js');
import {Arbol, arrayDatos} from '../ArbolBinario/arbol.js';

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


const colocarPedido=()=>{
    conexion.query(`SELECT * FROM Pedido`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            
        }
    });
}