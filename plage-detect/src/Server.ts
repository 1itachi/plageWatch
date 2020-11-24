import * as express from 'express'
import runPlagiarism from './Main'

const app = express();
app.use(express.json());

app.get('/plagiarism/', async(request: any, response: any) => {
    let items = []
    items.push(runPlagiarism())
    response.status(200).send(items);
});



const port: number = 8000;
app.listen(port, function() {
    console.log('PlageWatch Client Server listening on port ' + port);
});