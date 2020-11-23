var diff = require('deep-diff').diff
var _ = require('lodash');

//provided array of two nodes
export default class DetectPlagiarism {   
    private submission1:Array<Array<any>>
    private submission2:Array<Array<any>>
    private file1NameMap = {}
    private file2NameMap = {}

    constructor(submission1, submission2, file1NameMap, file2NameMap ){
        this.submission1 = submission1
        this.submission2 = submission2
        this.file1NameMap = file1NameMap
        this.file2NameMap = file2NameMap
    }   


    detect(){
        //loop through first submission
        let result  =  {}

        let ignoredProperties = ['loc', 'start', 'range', 'leadingComments', 'innerComments', 'trailingComments','extra','end', 
        'sourceType','interpreter', 'name']

        let totalLinesInSubmission1 = 0
        let numberOfFilesMatched = 0
        let  numberOfLinesPlagiarised = 0

        this.submission1.forEach((file1, index1)=>{
    
            //calculate total number of lines in submission1
            totalLinesInSubmission1 += file1[0].loc.end.line
            let linesPLagiarisedInFile = new Set()
            //each node in the file
                    //check each file of submission 2  
            this.submission2.forEach((file2,index2)=>{
                    
                let lineSet1 = new Set()
                let lineSet2 = new Set()

                file1.forEach(node1=>{    
                     //check if the node is sub-nested node
                     if(_.has(node1,'body')|| _.has(node1,'expression')|| _.has(node1,'arguments')|| _.has(node1,'init') || _.has(node1,'declarations')){  
           
                        //check each of nodes of submission 2
                        file2.forEach(node2=>{
                            //check if the node is sub-nested
                            if(_.has(node2,'body')|| _.has(node2,'expression')|| _.has(node2,'arguments')|| _.has(node2,'init') || _.has(node2,'declarations')){  
                     
                                let difference = diff(node1, node2, function(path, key) {
                                return ignoredProperties.indexOf(key) >= 0;
                            });

                             //if plagiarism is found
                                if(difference === undefined){
                                    //add lines to sets of file 1
                                    for(let i = node1.loc.start.line ; i<=node1.loc.end.line; i++){
                                        lineSet1.add(i)
                                        linesPLagiarisedInFile.add(i)
                                    }

                                    //add lines to sets of file 2
                                    for(let i = node2.loc.start.line ; i<=node2.loc.end.line; i++){
                                        lineSet2.add(i)
                                    }
    
                                }
                            }
                        })
                    }
                })

                    //add the lines for respoective files
                    if(lineSet1.size!==0 && lineSet2.size!=0){
                        numberOfFilesMatched = numberOfFilesMatched+1
                        let plageObject = {}
                        plageObject[this.file1NameMap[index1]] = Array.from(lineSet1)
                        plageObject[this.file2NameMap[index2]] = Array.from(lineSet2)
        
                        result[numberOfFilesMatched] = plageObject
    
                    }

            })

            numberOfLinesPlagiarised = (numberOfLinesPlagiarised + linesPLagiarisedInFile.size) 
            // console.log(counter)
        })


        result['score'] = (numberOfLinesPlagiarised/totalLinesInSubmission1) * 100

        return result

    }



   

}