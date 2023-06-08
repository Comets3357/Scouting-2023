const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


function createWindow() {
   const mainWindow = new BrowserWindow({
      width: 1920,
      height: 320,
      x: 0,
      y: 720,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false,
         enableRemoteModule: true
      }
   });
   mainWindow.loadFile('index.html');


   const tablet1 = new BrowserWindow({
      width: 640,
      height: 320,
      x: 0,
      y: 0,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet1.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet1.loadFile('tablet1.html');


   const tablet2 = new BrowserWindow({
      width: 640,
      height: 320,
      x: 640,
      y: 0,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet2.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet2.loadFile('tablet2.html');


   const tablet3 = new BrowserWindow({
      width: 640,
      height: 320,
      x: 1280,
      y: 0,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet3.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet3.loadFile('tablet3.html');


   const tablet4 = new BrowserWindow({
      width: 640,
      height: 320,
      x: 0,
      y: 360,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet4.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet4.loadFile('tablet4.html');


   const tablet5 = new BrowserWindow({
      width: 640,
      height: 320,
      x: 640,
      y: 360,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet5.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet5.loadFile('tablet5.html');


   const tablet6 = new BrowserWindow({
      width: 640,
      height: 320,
      x: 1280,
      y: 360,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet6.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet6.loadFile('tablet6.html');

   ipcMain.on('key', (event, arg) => {  
      tablet1.webContents.send('key', arg);
      tablet2.webContents.send('key', arg);
      tablet3.webContents.send('key', arg);
      tablet4.webContents.send('key', arg);
      tablet5.webContents.send('key', arg);
      tablet6.webContents.send('key', arg);
   });
}

app.whenReady().then(() => {
   createWindow();

   app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) {
         createWindow();
      }
   });
});

app.on('window-all-closed', function () {
   app.quit();
});


