import { argv } from "process";
import { compile } from "./commands/compile.js";

argv.splice(0, 2)
if (argv.indexOf("--out") === -1){
    await compile({ 
        in: argv[0], 
    })
} else {
    if ((argv.indexOf("--out") +1) !== -1){
        await compile({ 
            in: argv[0],
            out: argv[argv.indexOf("--out") +1]
        })
    } else  {
        console.log("You did not pass a file to --out")
    }
}


