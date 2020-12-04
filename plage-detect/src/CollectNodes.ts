import * as babel from "@babel/core"

export default class CollectNodes {
    //collect nodes across all files of the folder
    collectNodes(rootNodes): any {
        let nodesAcrossAllFiles = []
        rootNodes.forEach((ele) => {
            let nodesAcrossFile = []
            babel.traverse(ele, {
                enter(path) {
                    nodesAcrossFile.push(path.node)
                },
            })
            nodesAcrossAllFiles.push(nodesAcrossFile)
        })
        return nodesAcrossAllFiles
    }
}
