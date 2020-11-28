import * as express from 'express'
import runPlagiarism from './Main'


const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    let whitelist = [
        'http://localhost:3000',
        'http://localhost:3001',
        '*'
    ];
    let origin = req.headers.origin;
    if (whitelist.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
               "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/plagiarism/', async (request: any, response: any) => {
    let items = []
    items.push(runPlagiarism())
    response.status(200).send(items);
});

const port: number = 8000;
app.listen(port, function () {
    console.log('PlageWatch Client Server listening on port ' + port);
});
