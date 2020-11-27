var _ = require('lodash');

//provided array of two nodes
export default class DetectPlagiarism {   
    private submission1:Array<Array<any>>
    private submission2:Array<Array<any>>
    private file1NameMap = {}
    private file2NameMap = {}
    private fileSubmission1 = {}
    private fileSubmission2 = {}

    constructor(submission1, submission2, file1NameMap, file2NameMap, fileSubmission1, fileSubmission2 ){
        this.submission1 = submission1
        this.submission2 = submission2
        this.file1NameMap = file1NameMap
        this.file2NameMap = file2NameMap
        this.fileSubmission1 = fileSubmission1
        this.fileSubmission2 = fileSubmission2
    }   


    detect(){
        //loop through first submission
        let result  =  {}
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
                                 //if plagiarism is found
                                if(this.compare(node1, node2)===true){
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
                    //
                    //add the lines for respoective files
                    if(lineSet1.size!==0 && lineSet2.size!=0){
                        numberOfFilesMatched = numberOfFilesMatched+1
                        let plageObject = {}
                        // plageObject[this.file1NameMap[index1]] = Array.from(lineSet1)
                        // plageObject[this.file2NameMap[index2]] = Array.from(lineSet2)
                        // //build plagiarised object
                        let sub1Object = {
                            "file" : this.file1NameMap[index1],
                            "lines" : Array.from(lineSet1)
                        }
                        let sub2Object = {
                            "file" : this.file2NameMap[index2],
                            "lines" : Array.from(lineSet2)
                        }

                        plageObject['submission1'] = sub1Object
                        plageObject['submission2'] = sub2Object
        
                        result[numberOfFilesMatched] = plageObject
    
                    }

            })

            numberOfLinesPlagiarised = (numberOfLinesPlagiarised + linesPLagiarisedInFile.size) 
        })

        result['submission1'] = this.fileSubmission1
        result['submission2'] = this.fileSubmission2
        result['score'] = (numberOfLinesPlagiarised/totalLinesInSubmission1) * 100

        return result

    }



    private compare (obj1, obj2):boolean {

        //properties to ignore while comparing
        let ignoredProperties = ['loc', 'start', 'range', 'leadingComments', 'innerComments', 'trailingComments','extra','end', 
    'sourceType','interpreter', 'name']

      
        //Logic to check the condition 9 * (5+10) && (5+10) * 9 is plagiarised
        if(obj1 != null && obj2 !=null && obj1.type === 'BinaryExpression' && obj2.type === 'BinaryExpression'){
            return (this.compare(obj1.left, obj2.left) && this.compare(obj1.right, obj2.right)) 
            || (this.compare(obj1.right, obj2.left) && (this.compare(obj1.left, obj2.right)))
        }
        
        //Loop through properties in object 1    
        for (var p in obj1) {

            if(ignoredProperties.includes(p)) continue;

            //Check property exists on both objects
            if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

            
            switch (typeof (obj1[p])) {
                //Deep compare objects
                case 'object':
                    if (!this.compare(obj1[p], obj2[p])) return false;
                    break;
                //Compare function code
                case 'function':
                    if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
                    break;
                //Compare values
                default:
                    if (obj1[p] != obj2[p]) return false;
            }
        }
     
        //Check object 2 for any extra properties
        for (var p in obj2) {
            if(ignoredProperties.includes(p)) continue;
            if (typeof (obj1[p]) == 'undefined') return false;
        }
        return true;
    };

}