const runPlag = async (files: any) => {

    var data = new FormData()
    let i: number=1;
    for (const file of files) {
        data.append(`submission${i}`, file[0], file[0].name);
        i++
    }
    let results = await (await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/plagiarism`, {
        method: 'POST',
        body: data
    }).then((response) => response.json()).catch((error) => error));
    return results;
}

export default runPlag;