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
	///check the return type


	// serveRequest(req).then((resolve, reject):=> {
	// 	if(reject) {
	// 		return res.status(400).send(reject)
	// 	}
	// 	return

	// })
	
	serveRequest(req).then((result)=>{
		return res.status(200).send(result)
	}).catch((error)=>{
		return res.status(400).send([{"message": error.message}]);
	})

	// const result: Array<any> = await serveRequest(req);

	// if (result[0].hasOwnProperty('message'))

	// const form = formidable({ multiples: true })
	
	// // file size limit 15MB.
	// form.maxFileSize = 15 * 1024 * 1024;
	// form.keepExtensions = true;

	// let items = []

	// await form.parse(req, async (err: any, fields: any, files: any) => {
    //     const compressedSub1: any = files.submission1
    //     const compressedSub2: any = files.submission2
    //     if (
    //         path.extname(compressedSub1.name) === ".zip" &&
    //         path.extname(compressedSub2.name) === ".zip"
    //     ) {
		
	// 		await extractfiles(compressedSub1.path, submission1Path, compressedSub2.path, submission2Path)
	// 		try{
    //         items.push(await runPlagiarism(submission1Path, submission2Path))
	// 		return res.status(200).send(items)
	// 		}catch(e){
	// 		  return res.status(400).send({"message":"Sorry something went wrong!!"})
	// 		}
    //     } else {
    //         return res.status(400).send({"message":"Only zip folders are accepted"}) // return some error for not being zip
    //     }
    // })
	
})



app.listen(port, function () {
	console.log("PlageWatch Client Server listening on port " + port)
})
