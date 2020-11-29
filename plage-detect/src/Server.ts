import * as express from 'express'
import runPlagiarism from './Main'
import ExtractZip from './ExtractZip';
require('dotenv').config();
const formidable = require('formidable');
const path = require('path');

const port: string = process.env.API_SERVER_PORT || '8000';
const UI_ENDPOINT: string = process.env.UI_ENDPOINT || 'http://localhost:3000';

const submission1Directory: string = '/../Submissions/Submission1';
const submission2Directory: string = '/../Submissions/Submission2';

const submission1Path: string = path.join(__dirname, submission1Directory);
const submission2Path: string = path.join(__dirname, submission2Directory);

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    let whitelist = [
        UI_ENDPOINT
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

app.post('/api/plagiarism', async (req: any, res: any): Promise<any> => { ///check the return type

    const form = formidable({ multiples: true });

    const extractZip = new ExtractZip();

    form.parse(req, async (err: any, fields: any, files: any) => {
        const compressedSub1: any = files.submission1
        const compressedSub2: any = files.submission2

        if (path.extname(compressedSub1.name) === '.zip' && path.extname(compressedSub2.name) === '.zip') {
            extractZip.extractFiles(compressedSub1.path, submission1Path)
            extractZip.extractFiles(compressedSub2.path, submission2Path);
        } else {
            return 'error';// return some error for not being zip
        }
    });

    let items = []
    items.push(runPlagiarism())
    res.status(200).send(items);
})

app.listen(port, function () {
    console.log('PlageWatch Client Server listening on port ' + port);
});
