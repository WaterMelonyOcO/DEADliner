const { ipcMain } = require("electron");
const electron = require("electron");


function prepareWindow(name, load, app){
    let dt = ipcMain.on(name, (_,data)=>data);



}