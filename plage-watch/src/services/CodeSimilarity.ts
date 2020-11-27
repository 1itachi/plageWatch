
const getCodeSimilarity = async() => {
    let results = await(await fetch(`${process.env.REACT_APP_API_ENDPOINT}/plagiarism`)).json();
    return results;
}

export default getCodeSimilarity;