import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import candlestickRoutes from './routes/candlestickRoutes.js'
import { connectDB } from './config/db.js'
import { initSocket } from './config/socket.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()
const app = express();
const server = http.createServer(app);

app.use(cors())
app.use(express.json())

connectDB();

initSocket(server)

app.use(candlestickRoutes)


const PORT = process.env.PORT || 5000;

app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})   