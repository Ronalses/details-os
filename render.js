const os = require('os')
const { exec } = require('child_process')

function getGpuLinux(){
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
            resolve({description: `${result.fabricante} - ${result.producto}`})
        })
    })
}

function getGpuWin(){
    return new Promise((resolve, reject) => {
        exec('wmic path win32_VideoController get name', (err, stdout, string) => {
            if (err) reject(err)

            let gpuDescription = stdout.trim().split('\n')[1]

            resolve({description: gpuDescription})
        })
    })
}

function getGpu() {
    let gpuPromise
    switch (os.platform()) {
        case 'linux':
            gpuPromise = getGpuLinux()
            break;

        case 'win32':
            gpuPromise = getGpuWin()
            break;
    
        default:
            gpuPromise = Promise.resolve()
            break;
    }
    return gpuPromise
}

async function getInfo() {
    let dataGpu = await getGpu()

    let data = {
        hotname: `${os.hostname()}`,
        cpu: `${os.cpus()[0].model} x ${os.cpus().length}`,
        ram: `${os.totalmem()}`,
        arch: `${os.arch() === 'x64' ? '64 Bits' : '32 Bits'}`,
        platform: `${os.type}`,
        disk: `${os.freemem()}`,
        gpu: `${dataGpu.description}`
    }

    return data
}

getInfo()
    .then(dataInfo => {
        document.getElementById('hotname').innerHTML = dataInfo.hotname
        document.getElementById('cpu').innerHTML = dataInfo.cpu
        document.getElementById('ram').innerHTML = dataInfo.ram
        document.getElementById('arch').innerHTML = dataInfo.arch
        document.getElementById('platform').innerHTML = dataInfo.platform
        document.getElementById('disk').innerHTML = dataInfo.disk
        document.getElementById('gpu').innerHTML = dataInfo.gpu
    })