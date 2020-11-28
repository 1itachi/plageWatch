const runPlag = async (files: any) => {

    var data = new FormData()
    for (const file of files) {
        data.append('files', file, file.name)
    }

    let results = await (await fetch(`${process.env.REACT_APP_API_ENDPOINT}/plag`, {
        method: 'POST',
        body: data
    }).then((response) => response.json()).catch((error) => error));
    return results;
}

export default runPlag;