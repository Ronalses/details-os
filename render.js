const os = require('os')

function getInfo() {
    let data = {
        hotname: `${os.hostname()}`,
        ram: `${os.totalmem()}`,
        cpu: `${os.cpus()[0].model} x ${os.cpus().length}`,
        platform: `${os.platform()}`,
        arch: `${os.arch() === 'x64' ? '64 Bits' : '32 Bits'}`,
        gpu: `nuestar gpu xD`
    }

    return data
}

let dataInfo = getInfo()

document.getElementById('hotname').innerHTML = dataInfo.hotname
document.getElementById('ram').innerHTML = dataInfo.ram
document.getElementById('cpu').innerHTML = dataInfo.cpu
document.getElementById('arch').innerHTML = dataInfo.arch
document.getElementById('platform').innerHTML = dataInfo.platform
document.getElementById('gpu').innerHTML = dataInfo.gpu

console.log(os.cpus())