const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({ height: 600, width: 500 })
    mainWindow.loadFile('index.html')
})

app.on('window-all-closed', () => {
    app.quit()
})
