const mysql=require('mysql2');

const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        database: 'proyectoIntegrador_fof'
    });

connection.connect(function(err){
        if(err){
            console.log(err.code);
            console.log(err.fatal);
            return;
        }else{
            console.log('coneccion correcta');
        }
});

module.exports=connection;
    
        

    // results.forEach(rows => {
    //     console.log(rows);
    // });

    /*
    let long = rows.length;
    for (i=0; i<long; i++){
        let newRow= tablaR.insertRow(-1); aqui estoy sacando de los resultado un dato, internamente detecta cual es la ultima fila de la tabla y coloca la siguiente.
        let celdaId= newRow.inserCell(0); divide la tabla en 2 (1)
        let celdaUsuario = newRow.inserCell(1); (2)
    
    }

    let id=document.getelemen..
        if(rows[i].id===id){
            return "encontrado";
        }
    otra opcion es usar el query
        let idBuscar=document.getelemen..
        let nombreBuscar=docuement.getelemen....
        SELECT * FROM nombre de la tabla WHERE id=idBuscar;
        SELECT * FROM nombre de la tabla WHERE nombre=nombreBuscar;
    
        hay que usar backtips
        `` estos
    */





// export{connection};  