import * as express from "express"
import serveRequest from "./Routes/Service"

require("dotenv").config()


const port: string = process.env.API_SERVER_PORT || "8000"
const UI_ENDPOINT: string = process.env.UI_ENDPOINT || "http://localhost:3000"



const app = express()
app.use(express.json())
app.use(function (req, res, next) {
	let whitelist = [UI_ENDPOINT]
	let origin = req.headers.origin
	if (whitelist.indexOf(origin) > -1) {
		res.setHeader("Access-Control-Allow-Origin", origin)
	}
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	)
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	res.header("Access-Control-Allow-Credentials", "true")
	next()
})

app.post("/api/plagiarism", async (req: any, res: any) => {
	serveRequest(req).then((result)=>{
		return res.status(200).send(result)
	}).catch((error)=>{
		return res.status(400).send([{"message": error.message}]);
	})
})

app.listen(port, function () {
	console.log("PlageWatch Client Server listening on port " + port)
})
