import express from "express"
import dotenv from "dotenv"
import { checkDBConnection } from "./utils/dbHealthCheck.js"
import { loggerMiddleware } from "./middlewares/logger.middleware.js"
import { notFound } from "./middlewares/notFound.js"
import userRoutes from "./routes/user.route.js"
import vehicleRoutes from "./routes/vehicle.route.js"
dotenv.config()
const app = express()
app.use(express.json())
app.use(loggerMiddleware)
app.use("/users",userRoutes)
app.use("/vehicles",vehicleRoutes)
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
app.use(notFound)