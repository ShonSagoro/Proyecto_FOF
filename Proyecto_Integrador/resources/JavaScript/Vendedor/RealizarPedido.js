const conexion=require('../../../conectar.js');
import {Arbol} from '../ArbolBinario/arbol.js';
const lista=document.querySelector('#lista_productos');
const botonRealizarPedido=document.querySelector('#Hacer_pedido');
let pagoTotal=0;
let cantidaTotal=0;
let producto=[];
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
        let productoCantidad=document.getElementById('');
        
    }
    conexion.query(`INSERT INTO Pedido VALUES()`,()=>{})
}

botonRealizarPedido.addEventListener('click',()=>{


});



// elementoSumar.addEventListener('click',(e)=>{
//     console.log(e.target);
// });