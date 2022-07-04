const {app, BrowserWindow}=require('electron');
//const conexion=require('./conectar.js')


app.on('ready',()=>{
    let win=new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false
        }
    });
    // win.loadFile('./Proyecto_Integrador/index.html');
    win.loadFile('./Proyecto_Integrador/index.html');
    win.show();

    win.on('closed',()=>{
        app.quit();
    });
});