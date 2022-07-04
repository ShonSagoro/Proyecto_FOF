const conexion=require('../../../conectar.js');

// class Producto{
//     constructor(id,nombre, descripcion, costo){
//         this.id=id;
//         this.nombre=nombre;
//         this.descripcion=descripcion;
//         this.costo=costo
//     }
//     infoProducto(){
//         return "[Nombre: "+this.nombre+"; Descripcion: "+this.descripcion+"; Costo: $"+this.costo+"]";
//     }
// }
const botonBuscar=document.querySelector('#buscarProducto');
//const lista=document.getElementById('lista_productos');
const contenedorProductos=document.getElementById('Section_Producto');

// const listaProductos= [new Producto(1,'Banderilla','Banderila mitad cheddar mitad salchicha, muy rico.','25'),
// new Producto(2,'Torta de cochito','Torta con jamon, queso, sus verduras y cochito.','25'),
// new Producto(3,'Torta de cochinita pibil','Torta con jamon, queso, sus verduras, rajas y cochinita pibil.','30'),
// new Producto(4,'Choco-Flan','Un pastel imposible, donde la base es pastel de chocolate y la copa es de flan.','12')];



const mostrarListaProductos=()=>{
    contenedorProductos.innerHTML='';
    conexion.query('SELECT * FROM Producto', (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            console.log("entre");
            let long= rows.length;
            for(i=0; i<long; i++){
                console.log(rows[i]);
                const productoR=document.createElement('div');
                productoR.textContent=rows[i].nombre;
                contenedorProductos.prepend(productoR);
            }
        }
    });
    // for(i=0; i<listaProductos.length;i++){
    //     const productoR=document.createElement('div');
    //     productoR.textContent=listaProductos[i].nombre;
    //     contenedorProductos.prepend(productoR);
    // }
}

botonBuscar.addEventListener('click',()=>{  
    let nombreBuscar=document.getElementById('BuscarTxt').value;
    if(nombreBuscar!==''){
        buscarProducto(nombreBuscar);
    }else{
        vaciarDatos();
        console.log("estoy vacio, soy el Hollow Knight");
    }
});

const buscarProducto=producto=>{
    // producto=producto.toLowerCase();
    conexion.query("SELECT * FROM Producto WHERE nombre='"+producto+"'", (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows!==undefined){
                document.getElementById('txtDescripcionB').innerHTML=rows[0].descripcion;
                document.getElementById('txtPrecioB').innerHTML="$"+rows[0].costo+".00";
            }else{
                document.getElementById('txtDescripcionB').innerHTML="NO EXISTE EL PRODUCTO";
            }
    }
    });

    // for(i=0;i<listaProductos.length;i++){
    //     let nombre=listaProductos[i].nombre.toLowerCase();
    //     console.log(nombre);
    //     if(nombre==producto){
    //         mostrarDatosB(listaProductos[i]);
    //         return;
    //     }
    // }
   
    // return null;
}

const vaciarDatos=()=>{
    document.getElementById('txtDescripcionB').innerHTML='';
    document.getElementById('txtPrecioB').innerHTML='';
}


mostrarListaProductos();

contenedorProductos.addEventListener('click', (e)=>{
    console.log(e.target.textContent);
    buscarProducto(e.target.textContent);
})
// const CargarDatos=()=>{
//     conexion.query('SELECT * FROM Producto', (error, rows, fields)=>{
//         if(error){
//             throw error;
//         }else{
//             console.log("entre");
//             let long= rows.length;
//             for(i=0; i<long; i++){
//                 console.log(rows[i]);
//                 const producto=document.createElement('div');
//                 producto.textContent=rows[i].nombre;
//                 console.log(producto.textContent);
//                 productosContainer.prepend(producto);
//                 console.log("2222 entre");
//             }
//         }
//     });
// }

// const mostrarDatos=(row)=>{
//     document.getElementById('txtDescripcionB').innerHTML=row[0].descripcion;
//     document.getElementById('txtDescripcionB').innerHTML="$"+row[0].costo+".00";
// }

// CargarDatos();
//for each para eliminar todos los elmentos con document.delete]