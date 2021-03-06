// Nine GUI entrypoint

const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        backgroundColor: '#000000',
        //fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            webgl: true
        }
    });    
    
    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    });
}

app.commandLine.appendSwitch('enable-webassembly');

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

process.on('uncaughtException', function (err) {
    console.log('uncaughtException', { message : err.message, stack : err.stack }); // logging with MetaData
    
});
