import * as express from "express"
import serveRequest from "./Routes/Service"
import * as cors from "cors";
require("dotenv").config()


const port: string = process.env.API_SERVER_PORT || "8000"
const UI_ENDPOINT: string = process.env.UI_ENDPOINT || "http://localhost:3000"

const app = express()
app.use(express.json())

const corsOptions = {
	origin: UI_ENDPOINT, 
	optionsSuccessStatus: 200
}

app.post("/api/plagiarism", cors(corsOptions), async (req: express.Request, res: express.Response): Promise<any> => {
	serveRequest(req).then((result)=>{
		return res.status(200).send(result)
	}).catch((error)=>{
		return res.status(400).send([{"message": error.message}]);
	})
})

app.listen(port, function (): void {
	console.log("PlageWatch Client Server listening on port " + port)
})
