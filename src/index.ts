// Imports
// We import argv from process to parse arguments
import { argv } from "process";
// We import a coustum compile function to compile everything.
import { compile } from "./commands/compile.js";

// Splice the first two arguments from argv
argv.splice(0, 2)
// If there is not --out
if (argv.indexOf("--out") === -1){
    // Compile with only in
    await compile({ 
        in: argv[0], 
    })
// Else
} else {
    // If there is --out and the next argument exists   
    if ((argv.indexOf("--out") +1) !== -1){
        // We compile with the out argument
        await compile({ 
            in: argv[0],
            out: argv[argv.indexOf("--out") +1]
        })
    // Else
    } else  {
        // Throw an error
        console.log("You did not pass a file to --out")
    }
}


