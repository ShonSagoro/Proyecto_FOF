const conexion=require('../../../conectar.js');

const GuardarVenta=(fecha)=>{
    conexion.query(`SELECT * Venta WHERE='${fecha}'`,(error,rows, fields)=>{
        if(error){
            throw error;
        }else{
            let ganancia=document.getElementById('txtGanancia').value;
            if(rows.length!==0){
                conexion.query(`INSERT INTO Venta VALUES(0,'${ganancia}','${fecha}')`,(error)=>{
                    if(error){
                        throw error;
                    }
                });
            }else{
                conexion.query(`UPDATE Venta SET ganancia='${ganancia}' WHERE fecha='${fecha}'`,(err)=>{
                    if(err){
                        throw error;
                    }
                });
            }
        }
    })
}


document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    
    const $boton = document.querySelector("#btnCrearPdf");
    
    $boton.addEventListener("click", () => {
        let valorbtnC=document.querySelector("#btnCrearPdf").value;
        let valorbtnR=document.querySelector("#btnRegresar").value;
        document.querySelector("#btnCrearPdf").value="";
        document.querySelector("#btnRegresar").value="";
        let date=new Date();
        let mes=(date.getMonth()<10)? '0'+date.getMonth(): date.getMonth();
        let dia=(date.getDate()<10)?'0'+date.getDate(): date.getDate();
        let fecha=`${date.getFullYear()}-${mes}-${dia}`;
        const $elementoParaConvertir = document.body; // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0.5,
                filename: `Reporte ${fecha}`,
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'portrait' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err))
            .finally()
            .then(() => {
                console.log("Guardado!")   
            })  
            setTimeout(()=>{
                document.querySelector("#btnCrearPdf").value=valorbtnC;
                document.querySelector("#btnRegresar").value=valorbtnR;
            },5000);
        });
        GuardarVenta(fecha);
});
