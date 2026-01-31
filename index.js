import express from "express"
import dotenv from "dotenv"
import { checkDBConnection } from "./src/utils/dbHealthCheck.js"
dotenv.config()
const app = express()
app.use(express.json())
const startServer = async () => {
    const isDBConnected = await checkDBConnection()
    if(!isDBConnected){
        console.log("Server not started due to DB connection failure")
        process.exit(1)
    }
    const PORT = process.env.PORT || 5000
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
}
startServer()