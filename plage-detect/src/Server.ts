import * as express from "express"
import serveRequest from "./Routes/Service"
import * as cors from "cors"
require("dotenv").config()

const port: string = process.env.API_SERVER_PORT || "8000"
const UI_ENDPOINT: string = process.env.UI_ENDPOINT || "http://localhost:3000"

const app = express()
app.use(express.json())

//add cors options
const corsOptions = {
	origin: UI_ENDPOINT,
	optionsSuccessStatus: 200,
}

//Post api call to run plagiarism for two zip files
app.post("/api/plagiarism", cors(corsOptions), serveRequest)

//Server
app.listen(port, function (): void {
	console.log("PlageWatch Client Server listening on port " + port)
})