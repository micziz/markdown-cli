import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";
import { micromark } from 'micromark'

export async function compile(params: { in: string, out?: string }){
    try {
        const contentToCompile = await readFile(join(cwd(), params.in))
        const content = micromark(contentToCompile)
        try {
            let path: string;
            if (params.out !== undefined){
                console.log(params.out)
                path = String(params.out)
            } else {
                path = "./index.html"
            }
            console.log(path)
            await writeFile(path, content)
        } catch (e){
            console.log("There was an error writing the file!")
        }
    } catch (e) {
        console.log(`${params.in} not found! Please pass a valid input!`)
    }
}