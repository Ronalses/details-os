const os = require('os')
const { exec } = require('child_process')

function getGpu() {
    return new Promise((resolve, reject) => {
        exec('lshw -C display', (err, stdout, string) => {
            if (err) reject(err)

            let gpuData = stdout.replace('*-display', '').trim()

            let lines = gpuData.split('\n')

            let result = {}

            for (let line of lines) {
                let keyword = line.split(':')
                result[keyword[0].trim()] = keyword[1].trim()
            }
            resolve(result)
        })
    })
}

function getInfo() {

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

getGpu().then(data => console.log(data.fabricante))