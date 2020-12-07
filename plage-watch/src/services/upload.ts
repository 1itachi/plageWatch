import PlagResult from "../customTypes/PlagiarismData";

const runUpload: Function = async (files: any):Promise<Array<PlagResult>>  => {

    const data = new FormData()

    let i: number=1;
    for (const file of files) {
        data.append(`submission${i}`, file[0], file[0].name);
        i++
    }
    return await (await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/plagiarism`, {
        method: 'POST',
        body: data
    }).then((response) => response.json()).catch((error) => error));
}

export default runUpload;