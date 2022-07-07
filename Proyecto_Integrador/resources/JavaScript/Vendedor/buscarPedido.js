const conexion=require('../../../conectar.js');
const botonBuscarPedido=document.querySelector('#buscarProducto');


botonBuscarPedido.addEventListener('click',()=>{
    let textoBuscar=document.getElementById('PedidoB').value;
    // console.log(textoBuscar);
    if(textoBuscar!==''){
        buscarProducto(textoBuscar);
    }else{
        document.getElementById('verificacionTXT').innerHTML='INGRESE EL NOMBRE DEL PEDIDO';
    }
});

const buscarProducto=(pedido)=>{
    conexion.query(`SELECT * FROM Pedido WHERE nombre_pedido='${pedido}'`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.lenght!==0){
                document.getElementById('txtLocalizacion').innerHTML=rows[0].ubicacion;
                document.getElementById('txtEstado').innerText=rows[0].estado;
            }
        }
    });
}