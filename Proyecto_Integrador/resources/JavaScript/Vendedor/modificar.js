const conexion=require('../../../conectar.js');
import {Arbol, arrayDatos} from '../ArbolBinario/arbol.js';
const lista=document.querySelector('#lista_productos');
const btnBuscar=document.querySelector('#buscarPedido');
const btnEliminar=document.querySelector('#pedidoEliminar');
const btnModificar=document.querySelector('#pedidoModificar');
let pagoTotal=0;
let producto=[];

let arbolPedidos=new Arbol();


const datosPrecargados=()=>{
    conexion.query(`SELECT * FROM Producto`, (error, rows, fields)=>{
        if(error){
            throw error;
        }
        else{
            let long=rows.length;
            for(let i=0; i<long; i++){
                arbolPedidos.add(rows[i].nombre, rows[i]);
            }
            arbolPedidos.mostrar_InOrden();
            for(let i=0;i<long;i++){
                const elemento=` <li id="elemento">
                <p class="text">${rows[i].nombre} </p>
                <input type="button" class="liButon" id="${rows[i].nombre}" value="-">
                <p class="text" id="text_${rows[i].nombre}"> 0 </p>
                <input type="button" class="liButon" id="${rows[i].nombre}" value="+"> 
            </li>`;
                producto.push(rows[i].nombre);
                lista.insertAdjacentHTML("beforeend",elemento);
            }
        }
    })    
}
datosPrecargados();

const calcularPrecioPagar=(producto, accion)=>{
    conexion.query(`SELECT costo FROM producto WHERE nombre='${producto}'`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                if(accion==="+"){
                    document.getElementById('precioPedidoB').innerHTML="$"+pagoTotal+".00";
                    pagoTotal+=parseInt(rows[0].costo);
                    document.getElementById('precioPedidoB').innerHTML="$"+pagoTotal+".00";
                }else if(accion==='-'){
                    document.getElementById('precioPedidoB').innerHTML="$"+pagoTotal+".00";
                    pagoTotal-=parseInt(rows[0].costo);
                    document.getElementById('precioPedidoB').innerHTML="$"+pagoTotal+".00";
                }
            }
        }
    }); 
}

const cantidadProducto=(producto, accion)=>{
    let cantidadActual=parseInt(document.getElementById("text_"+producto).textContent);
    // console.log("text_"+producto);
    if(accion==='+'){
        cantidadActual+=1;
        calcularPrecioPagar(producto, accion);
    }else if(accion==='-'){
        if(cantidadActual===0){
            cantidadActual=0;
        }else{
            cantidadActual-=1;
            calcularPrecioPagar(producto, accion);
        }
    }
    document.getElementById("text_"+producto).innerHTML=cantidadActual;

}

lista.addEventListener('click', (e)=>{ 
   if(e.target.type=='button'){
        let accion=e.target.value;
        let producto=e.target.id;
        cantidadProducto(producto,accion);
   }
});

const BuscarDatos=(idPedido, precioPedido)=>{
    let query=`SELECT *
    FROM Pedido_producto
        INNER JOIN Producto
        ON Pedido_producto.producto_id_producto=producto.id_producto WHERE pedido_id_pedido='${idPedido}';`;
    conexion.query(query,(error,rows,fields)=>{
        if(error){
            throw error;
        }else{
            for(let i=0;i<rows.length;i++){
                document.getElementById("text_"+rows[i].nombre).innerHTML=rows[i].cantidad_producto;
            }
            pagoTotal=parseInt(precioPedido);
            document.getElementById('precioPedidoB').innerHTML="$"+precioPedido+".00";
            
        }
    });
}

const vaciarPedido=()=>{
    console.log('Entre vaciar');
    conexion.query(`SELECT * FROM Producto`, (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            for(let i=0;i<rows.length;i++){
                document.getElementById("text_"+rows[i].nombre).innerHTML='0';
            }
        }
    });
}

btnBuscar.addEventListener('click',()=>{
    vaciarPedido();
    document.getElementById('precioPedidoB').innerHTML="00.00";
    let nombreP=document.getElementById('BuscarTxt').value;
    if(nombreP!==''){
        conexion.query(`SELECT * FROM Pedido WHERE nombre_pedido='${nombreP}'`,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{
                if(rows.length!==0){
                    BuscarDatos(rows[0].id_pedido, rows[0].precio);
                }else{
                    document.getElementById('txtVerificar').innerHTML="NO EXISTE";
                }
            }
        });
    }else{
        document.getElementById('txtVerificar').innerHTML="INGRESE EL NOMBRE DEL PEDIDO";
    }
});

const actualizarDatos=(idPedido)=>{
    for(let i=0; i<producto.length; i++){ 
        let hayPedido=parseInt(document.getElementById("text_"+producto[i]).textContent);
        let productoTemp=producto[i];
        if(hayPedido!==0){
            conexion.query(`SELECT * FROM Producto WHERE nombre='${productoTemp}'`, (error, rows, fields)=>{
                if(error){
                    throw error;
                }else{
                    let idProducto=rows[0].id_producto;
                    let query=`SELECT * FROM Pedido_producto WHERE pedido_id_pedido='${idPedido}' && producto_id_producto=${idProducto}`;
                    conexion.query(query,(error,rows,fields)=>{
                        if(error){
                            throw error;
                        }else if(rows.length!==0){
                            
                            let query=`UPDATE Pedido_producto SET cantidad_producto='${parseInt(document.getElementById("text_"+productoTemp).textContent)}' WHERE pedido_id_pedido='${idPedido}' && producto_id_producto='${idProducto}'`;
                            conexion.query(query,(error, rows, fields)=>{
                                if(error){
                                    throw error;
                                }else{
                                    console.log('EXITO 1');
                                    console.log("ENTRE: "+parseInt(document.getElementById("text_"+productoTemp).textContent));
                                    console.log("SOY: "+productoTemp);
                                    document.getElementById("text_"+producto[i]).textContent=0;
                                }
                            }); 
                        }else{
                            conexion.query(`SELECT * FROM Producto WHERE nombre='${productoTemp}'`, (error, rows, fields)=>{
                                if(error){
                                    throw error;
                                }else{
                                    let query=`INSERT INTO Pedido_Producto VALUES('${rows[0].id_producto}','${idPedido}','${hayPedido}')`;
                                    conexion.query(query, (error, rows, fields)=>{
                                        if(error){
                                            throw error;
                                        }else{
                                            console.log("Alabama");
                                            document.getElementById("text_"+producto[i]).textContent=0;
                                        }
                                    });
                                }
                            });
                            
        
                        }
                    });
                }
            });
 

        }else{
            conexion.query(`SELECT * FROM Producto WHERE nombre='${productoTemp}'`, (error, rows, fields)=>{
                if(error){
                    throw error;
                }else{
                    let idProducto=rows[0].id_producto;
                    let query=`SELECT * FROM Pedido_producto WHERE pedido_id_pedido='${idPedido}' && producto_id_producto=${idProducto}`;
                    conexion.query(query,(error,rows,fields)=>{
                        if(error){
                            throw error;
                        }else if(rows.length!==0){
                            let query=`UPDATE Pedido_producto SET cantidad_producto='${parseInt(document.getElementById("text_"+productoTemp).textContent)}' WHERE pedido_id_pedido='${idPedido}' && producto_id_producto='${idProducto}'`;
                            conexion.query(query,(error, rows, fields)=>{
                                if(error){
                                    throw error;
                                }else{
                                    console.log('EXITO 1');
                                    console.log("ENTRE: "+0);
                                    console.log("SOY: "+productoTemp);
                                    document.getElementById("text_"+producto[i]).textContent=0;
                                }
                            }); 
                        }
                    });
                }  
            });
        }   
    }
}
btnModificar.addEventListener('click',()=>{
    document.getElementById('txtVerificar').value='';
    let nombreM=document.getElementById('BuscarTxt').value;
    if(nombreM!==''){
        console.log(pagoTotal);
        conexion.query(`SELECT * FROM Pedido WHERE nombre_pedido='${nombreM}'`,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{
                if(rows[0].estado==='pendiente'){
                    conexion.query(`UPDATE Pedido SET precio='${pagoTotal}' WHERE nombre_pedido='${rows[0].nombre_pedido}'`,(error,rows,fields)=>{
                        if(error){
                            throw error;
                        }else{
                        console.log('Actualizado');
                        }
                    });
                    console.log("MAMAHUEVO SOY:" +nombreM);
                    console.log("MAMAHUEVO SOY:"+ rows[0].id_pedido);
                    actualizarDatos(rows[0].id_pedido); 
                }else{
                    document.getElementById('txtVerificar').innerHTML="EL PEDIDO ESTA SIENDO PROCESADO";
                }
            }
        });
        document.getElementById('BuscarTxt').value='';
        document.getElementById('precioPedidoB').textContent='00.00';
        setTimeout(() => {
            window.location.assign("modificar.html"); 
        }, 5000);
    }
});

btnEliminar.addEventListener('click',()=>{
    let nombreM=document.getElementById('BuscarTxt').value;
    if(nombreM!==""){
        conexion.query(`DELETE FROM Pedido WHERE nombre_pedido='${nombreM}';`,(error,rows,fields)=>{
            if(error){
                throw error;
            }else{
                document.getElementById('txtVerificar').innerHTML="PEDIDO ELIMINADO";
                for(let i=0; i<producto.length; i++){ 
                    document.getElementById("text_"+producto[i]).textContent='0';
                    document.getElementById('BuscarTxt').value='ELIMINADO';
                }
            }
    
        });
        setTimeout(() => {
            window.location.assign("modificar.html"); 
        }, 5000);
    } 
});