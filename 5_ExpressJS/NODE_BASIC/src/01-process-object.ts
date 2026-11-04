//env variables - 
//command line arguments
//exit code 
//process lifecycle events 


 //read backend port from env file 
 //read secrets - db urls, api keys, password, google authy secret
 //read CLI arguments in scripts

 //process.env

 import process from "node:process"

//dotenv
// process.env // contain all the env variables
// const nodeEnv = process.env.NODE_ENV ?? "development"

// console.log(nodeEnv);

//process.env values are always either string or undefined
//for example 
// const PORT = 3000 //let's say we have this int value in env
// const port = Number (process.env.PORT ?? 3000);


//Bad pratice 
// const port = 3000;


//process.argv vs process.argv[2]

//first two index [0] and [1] will be read by node. 
// process.argv
// [
//     "/path/to/node", 
//     "src/01-process-object.ts", 
//     "start"
// ]\


const command = process.argv[2] ?? "start";

//Fail flag
//Crash flag

const shouldFail = process.argv.includes("--fail");
const shouldCrash = process.argv.includes("--crash")


//do not start async here
//node is already shutting down
//final log, final cleanup

process.on("exit", (code) => {
    console.log(`process finished with exit code ${code}`);
})

function runApp(): void {
    console.log({command,});

    if(shouldFail){
        console.error("Manual crash triggered with --fail flag")
    }
    if(shouldCrash){
        console.error("Manual crash triggered with --crash flag")
    }
}
