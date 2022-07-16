const conexion=require('../../../conectar.js');
const botonBuscar=document.querySelector('#buscarProducto');
const botonReemplazar=document.querySelector('#btnReemplazar');
const botonEliminar=document.querySelector('#btnEliminar');



botonBuscar.addEventListener('click',()=>{  
    let nombreBuscar=document.getElementById('BuscarTxt').value;
    if(nombreBuscar!==''){
        buscarProducto(nombreBuscar);
    }else{
        vaciarDatos();
        document.getElementById('txtDescripcionB').innerHTML="No hay nada que buscar";
    }
});

const buscarProducto=producto=>{
    conexion.query("SELECT * FROM Producto WHERE nombre='"+producto+"'", (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                document.getElementById('txtDescripcionB').innerHTML=rows[0].descripcion;
                document.getElementById('txtPrecioB').innerHTML="$"+rows[0].costo+".00";
            }else{
                document.getElementById('txtDescripcionB').innerHTML="NO EXISTE";
                document.getElementById('txtPrecioB').innerHTML="NO EXISTE";
            }
    }
    });
}

const vaciarDatos=()=>{
    document.getElementById('txtDescripcionB').innerHTML='';
    document.getElementById('txtPrecioB').innerHTML='';
}

botonReemplazar.addEventListener('click',()=>{
    let nombreBuscarReem=document.getElementById('BuscarTxt').value;
    if(nombreBuscarReem!=''){
        buscarProductoReem(nombreBuscarReem);
    }else{
        document.getElementById('verificarAccion').innerHTML="Busque el producto primero";
    }
   
});

const buscarProductoReem=producto=>{
    conexion.query("SELECT * FROM Producto WHERE nombre='"+producto+"'", (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                let descripcionReem=document.getElementById('DescripcionPR').value;
                let precioReem=document.getElementById('txtPrecioNuevo').value;
                if(descripcionReem!='' && precioReem!=''){
                    if(descripcionReem!==rows[3].descripcion || precioReem!==rows[0].costo){
                        conexion.query("UPDATE Producto SET descripcion='"+descripcionReem+"', costo='"+precioReem+"' WHERE id_producto= '"+rows[0].id_producto+"'", (error)=>{
                            if(error){
                                throw error;
                            }else{
                                document.getElementById('DescripcionPR').innerHTML='';
                                document.getElementById('txtPrecioNuevo').innerHTML='';
                                document.getElementById('txtDescripcionB').innerHTML=descripcionReem;
                                document.getElementById('txtPrecioB').innerHTML="$"+precioReem+".00";
                            }
                        });
                    }else{
                        document.getElementById('verificarAccion').innerHTML="No necesita cambiar, los datos son iguales";
                    }
                }else{
                    document.getElementById('verificarAccion').innerHTML="INGRESE DATOS A REEMPLAZAR";
                }
            }else{
                document.getElementById('txtDescripcionB').innerHTML="NO EXISTE";
                document.getElementById('txtPrecioB').innerHTML="NO EXISTE";
            }
    }
    });
}

botonEliminar.addEventListener('click',()=>{
    let nombreBuscarEl=document.getElementById('BuscarTxt').value;
    if(nombreBuscarEl!=''){
        buscarProductoELiminar(nombreBuscarEl);
    }else{
        document.getElementById('verificarAccion').innerHTML="Busque el producto primero";
    }
    
});

const buscarProductoELiminar=producto=>{
    conexion.query("SELECT * FROM Producto WHERE nombre='"+producto+"'", (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                conexion.query("DELETE FROM Producto WHERE id_producto= '"+rows[0].id_producto+"'", (error)=>{
                    if(error){
                        throw error;
                    }
                    else{
                        document.getElementById('txtDescripcionB').innerHTML="Eliminado";
                        document.getElementById('txtPrecioB').innerHTML="Eliminado";
                        document.getElementById('verificarAccion').innerHTML="Producto eliminado";
                    }
                });
            }
            else{
                document.getElementById('txtDescripcionB').innerHTML="NO EXISTE";
                document.getElementById('txtPrecioB').innerHTML="NO EXISTE";
            }
    }
    });
}