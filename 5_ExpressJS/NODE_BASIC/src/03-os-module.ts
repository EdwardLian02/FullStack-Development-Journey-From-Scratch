//OS 
//check cpu
// memory
// check dir

import os from 'node:os';

function runOsDemo():void {
    console.log('platform', os.platform())
    console.log('platform', os.arch())
    console.log('os type', os.type())
    console.log('os release', os.release())
    console.log('os home dir', os.homedir())

    const cpus = os.cpus()

    console.log(cpus.length)

    if(cpus.length > 0){
        console.log('first cpu model', cpus[0]?.model, cpus[0]?.speed)
    }

    console.log(os.totalmem(), os.freemem())
}

runOsDemo()