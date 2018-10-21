const os = require('os')

function getInfo(){

    let data = {
        hotname: `${os.hostname()}`
    }

    return data
}

let dataInfo = getInfo()

document.getElementById('hotname').innerHTML = dataInfo.hotname