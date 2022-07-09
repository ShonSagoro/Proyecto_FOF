const conexion=require('../../../conectar.js');
import {Arbol} from '../ArbolBinario/arbol.js';
const lista=document.querySelector('#lista_productos');
const botonRealizarPedido=document.querySelector('#Hacer_pedido');
let pagoTotal=0;
let cantidaTotal=0;
let producto=[];
let id_pedido=0;
let arbolPedidos=new Arbol();


const datosPrecargados=()=>{
    conexion.query(`SELECT * FROM Producto`, (error, rows, fields)=>{
        if(error){
            throw error;
        }
        else{
            let long=rows.length;
            for(let i=0;i<long;i++){
                const elemento=` <li id="elemento">
                <p class="text">${rows[i].nombre} </p>
                <input type="button" class="liButon" id="${rows[i].nombre}" value="-">
                <p class="text" id="text_${rows[i].nombre}"> 0 </p>
                <input type="button" class="liButon" id="${rows[i].nombre}" value="+"> 
            </li>`;
                producto.push(rows[i].nombre);
                
                // console.log(elemento);
                lista.insertAdjacentHTML("beforeend",elemento);
            }
        }
    })    
    console.log(producto);
}
datosPrecargados();

const calcularPrecioPagar=(producto, accion)=>{
    conexion.query(`SELECT costo FROM producto WHERE nombre='${producto}'`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                if(accion==="+"){
                    document.getElementById('precioActual').innerHTML="$"+pagoTotal+".00";
                    pagoTotal+=parseInt(rows[0].costo);
                    document.getElementById('precioActual').innerHTML="$"+pagoTotal+".00";
                }else if(accion==='-'){
                    document.getElementById('precioActual').innerHTML="$"+pagoTotal+".00";
                    pagoTotal-=parseInt(rows[0].costo);
                    document.getElementById('precioActual').innerHTML="$"+pagoTotal+".00";
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
        cantidaTotal+=1;
        calcularPrecioPagar(producto, accion);
    }else if(accion==='-'){
        if(cantidadActual===0){
            cantidadActual=0;
        }else{
            cantidadActual-=1;
            cantidaTotal-=1;
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

const CargarPedido=()=>{
    let long= producto.length;
    for(let i=0; i<long; i++){
        let productoCantidad=document.getElementById("text_"+producto[i]).textContent;
        cantidaTotal=cantidaTotal+parseInt(productoCantidad );
    }
    let nombrePedido=document.getElementById('nombrePedido').value;
    console.log(pagoTotal);
    if(pagoTotal!==0&&nombrePedido!==''){
        conexion.query(`SELECT * FROM Pedido WHERE nombre_pedido='${nombrePedido}'`,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{
                if(rows.length===0){
                    console.log(pagoTotal);
                    conexion.query(`INSERT INTO Pedido VALUES(0,'${nombrePedido}','${pagoTotal}','pendiente', 'Col.Juarez')`,(error, rows, fields)=>{
                        if(error){
                            throw error;
                        }else{
                            for(let i=0; i<long; i++){
                                document.getElementById("text_"+producto[i]).innerHTML='0';
                            }
                            console.log('ExitoS');
                            document.getElementById('precioActual').innerHTML="$00.00";
                            document.getElementById('nombrePedido').value='';
                            pagoTotal=0;
                            //no tocar, pendiente
                            conexion.query(`SELECT id_pedido FROM Pedido WHERE nombre_pedido='${nombrePedido}'`,(error, rows, fields)=>{
                                id_pedido=rows[0].id_pedido;
                                console.log(id_pedido);
                            });
                        }
                    });    
                }else{
                    console.log("ya existe");
                }   
            }
        });   
    }
}

const CargarPedidoProductos=()=>{
    let long= producto.length;
    for(let i=0; i<long; i++){
        conexion.query(`SELECT * FROM Producto WHERE nombre='${producto[i]}'`,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{

            }

        });
    }
}

botonRealizarPedido.addEventListener('click',()=>{
    cantidaTotal=0;
    console.log(pagoTotal);
    CargarPedido();
    CargarPedidoProductos();

});



// elementoSumar.addEventListener('click',(e)=>{
//     console.log(e.target);
// });