//why timer? 
//run code after some delay
//run repeately after some internal - 2 seconds


//settimeout
//setintervel
//cleartimeout
//clearinterval
//setimmediate

import { setTimeout as sleep } from "node:timers/promises";

function runSetTimeOutExample(): void{
    console.log('1. setTimeout example started');

    setTimeout(() =>{
        console.log("2. This run after 1 second");
    }, 1000)

    console.log('3. THis run immediately, node doesn\'t wait')
}

function runClearTimeoutExample(): void {
    //this will never run
    const timerId = setTimeout(() =>{
        console.log('these message will not run')
    }, 2000)

    clearTimeout(timerId)
    console.log("4. clear timeout cancel the 2 second timer")
}

//setInterval is going to run the callback again and again after the delay

function runSetIntervalExample(): void{
    let count = 0;

    const intervalId = setInterval(()=> {
        count++;
        console.log(`5. setInterval tick: ${count}`);

        if(count === 3){
             clearInterval(intervalId) 
             console.log('6. setinterval stop')
        }
    }, 2000 )
}


function runSetImmediateExample() : void {
    setImmediate(()=> {
        console.log("7. set immediate callback")
    })

    console.log("8. synchronous code after set immediate")
}

async function runPromiseTimerExample(): Promise<void>{
    console.log("9. waiting for promise based timer")

    await sleep(1500)

    console.log("10. promise based timer finishes after 1.5 seconds")
}

// runSetTimeOutExample();
// runClearTimeoutExample();
// runSetIntervalExample()
runSetImmediateExample();