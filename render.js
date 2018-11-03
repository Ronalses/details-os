const os = require('os')
const { exec } = require('child_process')

function getGpuLinux() {
    return new Promise((resolve, reject) => {
        exec('lshw -C display', (error, str, stdout) => {
            if (error) reject(error)

            let strGpu = str.replace('*-display', '').trim()
            strGpu = strGpu.replace('descripción', 'description')

            let arrData = strGpu.split('\n')

            let result = {}

            for(let element of arrData){
                let data = element.split(':')
                result[data[0].trim()] = data[1].trim()
            }

            resolve({ description: `${result.fabricante} -- ${result.producto}`})
        })
    })
}

function getGpu() {
    let platform = os.platform()

    if (platform === 'linux') {
        return getGpuLinux()
    } else if (platform === 'win32') {
        console.log('Windows')
    }
}

async function getInfo() {
    try {
        let gpuData = await getGpu()

        let data = {
            hotname: `${os.hostname()}`,
            ram: `${os.totalmem()}`,
            cpu: `${os.cpus()[0].model} x ${os.cpus().length}`,
            platform: `${os.platform()}`,
            arch: `${os.arch() === 'x64' ? '64 Bits' : '32 Bits'}`,
            gpu: `${gpuData.description}`
        }

        return data
    } catch (error) {
        alert('ocurrio un error')
    }
}

getInfo().then((dataInfo)=> {
    document.getElementById('hotname').innerHTML = dataInfo.hotname
    document.getElementById('ram').innerHTML = dataInfo.ram
    document.getElementById('cpu').innerHTML = dataInfo.cpu
    document.getElementById('arch').innerHTML = dataInfo.arch
    document.getElementById('platform').innerHTML = dataInfo.platform
    document.getElementById('gpu').innerHTML = dataInfo.gpu

})
getGpu().then(console.log)