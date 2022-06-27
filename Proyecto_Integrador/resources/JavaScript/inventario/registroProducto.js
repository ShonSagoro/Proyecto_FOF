const Contador_caracteres=()=>{
    let caracteres=document.getElementById('DescripcionPR').value.length;
    document.getElementById('textarea_count').innerHTML=caracteres+"/250 (Max. 200 caracteres)";
}