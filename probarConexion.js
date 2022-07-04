const conexion=require('../conectar.js'); 

const saludar=()=>{
    alert("Hellow");
}


// conexion.query('SELECT * FROM Producto', function (error, rows, fields){
//     if(error){
//         throw error;
//     }
//     else{
//         rows.forEach(rows => {
//             console.log(rows);
//         });
//     }
// });


// conexion.query('SELECT * FROM Cuenta', function (error, rows, fields){
//     if(error){
//         throw error;
//     }
//     else{
//         rows.forEach(rows => {
//             console.log(rows);
//         });
//     }
// });

/*
INSERT INTO empresa
VALUES('4','Kraft Heinz','Compañía estadounidense agroalimentaria; cuyo lema expresa que tiene "57 variedades" de salsa.',
'Ofrecer salsas de todos los tipos','1869-03-12');
// */
// botonSubirDatos.addEventListener('click',()=>{
//     let producto=document.getElementById("txtNproducto").value;
//     let descripcion=document.getElementById("txtDproducto").value;
//     let precio=document.getElementById("txtPproducto").value;
//     let id=document.getElementById("txtIdproducto").value;
//     let cantProducto=document.getElementById("txtCproducto").value;
//     console.log(producto+descripcion+precio+id+cantProducto);
//     if(producto!=""&&descripcion!=""&&precio!=""&&id!=""&&cantProducto!=""){
//         //let productoNuevo=`INSERT INTO producto VALUE(`;
//         let productoNuevo="INSERT INTO producto VALUES ('"+id+"','"+producto+"','"+descripcion+"','"+precio+"','"+cantProducto+"')";
//         conexion.query(productoNuevo, function (error, results, fields) {
//             if (error)
//                 throw error;
        
//             console.log(results);
//             conexion.query('SELECT * FROM producto', function (error, results, fields) {
//                 if (error)
//                     throw error;
            
//                 results.forEach(result => {
//                     console.log(result);
//                 });
//             });
//     });
//     }else{
//         console.log("datos vacios");
        
//     }
// });

// botonMostrar.addEventListener('click', ()=>{
//     conexion.query('SELECT * FROM producto', function (error, rows, fields) {
//         let tablaR=document.getElementById("tabla");
//         if (error){
//             throw error;
//         }
//         // rows.forEach(rows => {
//         //     console.log(rows);
//         // });
//         else{
//             console.log("ejecutado correctamente");
//             let long= rows.length;
//             for(i=0; i<long; i++){
//                 let newRow= tablaR.insertRow(-1);
//                 let celdaId= newRow.insertCell(0);
//                 let celdaProducto= newRow.insertCell(1);
//                 let celdaDescripcion= newRow.insertCell(2);
//                 let celdaPrecio= newRow.insertCell(3);
//                 let celdaCantProducto= newRow.insertCell(4);
//                 let textoId=document.createTextNode(rows[i].id_producto);
//                 let textoProducto=document.createTextNode(rows[i].nombre);
//                 let textoDescripcion=document.createTextNode(rows[i].descripcion);
//                 let textoPrecio=document.createTextNode(rows[i].produccion);
//                 let textoCantidad=document.createTextNode(rows[i].cant_ult_ventas);
//                 celdaId.appendChild(textoId);
//                 celdaProducto.appendChild(textoProducto);
//                 celdaDescripcion.appendChild(textoDescripcion);
//                 celdaPrecio.appendChild(textoPrecio);
//                 celdaCantProducto.appendChild(textoCantidad);
//             }
//         }
//     })
// });

// botonBuscar.addEventListener('click',()=>{
//     let producto=document.getElementById('BuscarTxt').value;
//     if(producto!=""){
//         document.getElementById('text_confirmar').innerHTML="bien";
//         console.log("SELECT * FROM producto WHERE nombre='"+producto+"';")
//         conexion.query("SELECT * FROM producto WHERE nombre='"+producto+"';", function (error, rows, fields) {
//             let tablaR=document.getElementById("tablaBuscar");
//             if (error){
//                 throw error;
//             }
//             // rows.forEach(rows => {
//             //     console.log(rows);
//             // });
//             else{
//                 console.log("ejecutado correctamente");
//                 let long= rows.length;
//                 for(i=0; i<long; i++){
//                     let newRow= tablaR.insertRow(-1);
//                     let celdaId= newRow.insertCell(0);
//                     let celdaProducto= newRow.insertCell(1);
//                     let celdaDescripcion= newRow.insertCell(2);
//                     let celdaPrecio= newRow.insertCell(3);
//                     let celdaCantProducto= newRow.insertCell(4);
//                     let textoId=document.createTextNode(rows[i].id_producto);
//                     let textoProducto=document.createTextNode(rows[i].nombre);
//                     let textoDescripcion=document.createTextNode(rows[i].descripcion);
//                     let textoPrecio=document.createTextNode(rows[i].produccion);
//                     let textoCantidad=document.createTextNode(rows[i].cant_ult_ventas);
//                     celdaId.appendChild(textoId);
//                     celdaProducto.appendChild(textoProducto);
//                     celdaDescripcion.appendChild(textoDescripcion);
//                     celdaPrecio.appendChild(textoPrecio);
//                     celdaCantProducto.appendChild(textoCantidad);
//                 }
//             }
//         })
//     }else{
//         document.getElementById('text_confirmar').innerHTML="mal";
//     }
// 