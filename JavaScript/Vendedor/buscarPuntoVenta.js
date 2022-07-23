const conexion=require('../../../conectar.js');
const botonBuscarVendedor=document.querySelector('#buscarPedido');


botonBuscarVendedor.addEventListener('click',()=>{
    let textoBuscarPV=document.getElementById('VendedorB').value;
    if(textoBuscarPV!=''){
        buscarPuntoVenta(textoBuscarPV);
    }else{
        document.getElementById('verificacionTXT').innerHTML='INGRESE EL NOMBRE DEL VENDEDOR';
    }
});


const buscarPuntoVenta=nombreV=>{
    conexion.query(`SELECT ubicacion FROM Cuenta WHERE usuario='${nombreV}' AND rol='Vendedor'`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.lenght!==0){
                document.getElementById('txtLocalizacionV').innerHTML=rows[0].ubicacion;            }
        }
    });

}
