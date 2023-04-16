import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";
import { micromark } from 'micromark'
import matter from 'gray-matter'

function handleContent(params: {compileEdContent: string, title: string, description: string}){
    return `
<html>
    <head>
        <title>${params.title}</title>
        <meta name="description" content="${params.description}">
    </head>
    <body>
        ${params.compileEdContent}
    </body>
</html>
`
}

export async function compile(params: { in: string, out?: string }){
    try {
        const readWithFrontMatter = await readFile(join(cwd(), params.in))
        const parsedFile = matter(readWithFrontMatter)
        const frontMatter = parsedFile.data
        const content = micromark(parsedFile.content)
        
        try {
            const title: string = (typeof frontMatter.title !== "undefined") ? frontMatter.title : "Default title"
            const description: string = (typeof frontMatter.description !== "undefined") ? frontMatter.description : "Default description"
            let path: string;
            if (params.out !== undefined){
                console.log(params.out)
                path = String(params.out)
            } else {
                path = "./index.html"
            }
            console.log(path)
            await writeFile(path, handleContent({compileEdContent: content, title: title, description: description}))
        } catch (e){
            console.log("There was an error writing the file!")
        }
    } catch (e) {
        console.log(`${params.in} not found! Please pass a valid input!`)
    }
}