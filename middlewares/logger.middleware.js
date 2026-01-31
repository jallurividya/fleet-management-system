import { error } from "console"
import fs from "fs"
export const loggerMiddleware = (req,res,next) => {
    const log = `${new Date().toISOString()} | ${req.method} | ${req.originalUrl} \n`
    fs.writeFileSync("logs.txt", log, (err)=>{
        if(err){
            console.log("Error",error)
        }
    })
    next()
}