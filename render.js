const os = require('os')

function getInfo(){

    let data = {
        hotname: `${os.hostname()}`,
        cpu: `${os.cpus()[0].model} x ${os.cpus().length}`,
        ram: `${os.totalmem()}`,
        arch: `${os.arch() === 'x64' ? '64 Bits' : '32 Bits'}`,
        platform: `${os.type}`,
        disk: `${os.freemem()}`
    }

    return data
}

let dataInfo = getInfo()

document.getElementById('hotname').innerHTML = dataInfo.hotname
document.getElementById('cpu').innerHTML = dataInfo.cpu
document.getElementById('ram').innerHTML = dataInfo.ram
document.getElementById('arch').innerHTML = dataInfo.arch
document.getElementById('platform').innerHTML = dataInfo.platform
document.getElementById('disk').innerHTML = dataInfo.disk