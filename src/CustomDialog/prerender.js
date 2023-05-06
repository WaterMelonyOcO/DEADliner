const { contextBridge } = require('electron')
const { sendResponse, waitProps } = require('electron-custom-dialog')
const questionEl = document.getElementById('question')
const yesBtn = document.getElementById('yesBtn')
const noBtn = document.getElementById('noBtn')


contextBridge.exposeInMainWorld('api', {
    send: () => waitProps().then((props) => {
        sendResponse(true)
    })
})
