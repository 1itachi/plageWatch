"use strict";
// the game file
exports.__esModule = true;
let data = require("./data");
let bset = require("./bset");
let tetras = require("./tetras");
let aux = require("./aux");
let elim = require("./elim");
let consts = require("./consts");
// this changes w
// add the current tetra's blocks onto the world's block list
function touchdown(w) {
    // pick a random tetra
    w.tetra = aux.listPickRandom(aux.tetraBlocks);
    let newBlocks = bset.blocksUnion(w.tetra.blocks, w.blocks);
    elim.eliminateFullRows(newBlocks);
    w.blocks = newBlocks;
}
// has the current tetra landed on any blocks?
// need to make a tmp tetra for this
function didLandedOnBlocks(w) {
    let tmpTetra = data.tetraCopy(w.tetra);
    tetras.tetraMove(0, 1, tmpTetra);
    return tetras.doesTetraOverlapsBlocks(tmpTetra, w.blocks);
}
function didLandedOnFloor(w) {
    return bset.blocksMaxY(w.tetra.blocks) === (consts.boardHeight - 1);
}
function didLanded(w) {
    return didLandedOnFloor(w) || didLandedOnBlocks(w);
}
// take current tetra and move it down until it lands
function worldJumpDown(w) {
    if (didLanded(w)) {
        // do nothing
    }
    else {
        // move tetra down, and go to town
        // i.e. move tetra down and continue
        tetras.tetraMove(0, 1, w.tetra);
        worldJumpDown(w);
    }
}
function nextWorld(w) {
    if (didLanded(w)) {
        touchdown(w);
    }
    else {
        tetras.tetraMove(0, 1, w.tetra);
    }
}
function tryNewTetra(w, newTetra) {
    if (bset.blocksMinX(newTetra.blocks) < 0 ||
        bset.blocksMaxX(newTetra.blocks) >= consts.boardWidth ||
        tetras.doesTetraOverlapsBlocks(newTetra, w.blocks)) {
        // do nothing
    }
    else {
        // update world's tetra
        w.tetra = newTetra;
    }
}
// move w.tetra by dx, dy, but only if you can
function worldMove(dx, dy, w) {
    let tmpTetra = data.tetraCopy(w.tetra);
    tetras.tetraMove(dx, dy, tmpTetra);
    tryNewTetra(w, tmpTetra);
}
// try to rotate ccw
function worldRotateCCW(w) {
    let tmpTetra = data.tetraCopy(w.tetra);
    tetras.tetraRotateCCW(tmpTetra);
    tryNewTetra(w, tmpTetra);
}
function worldRotateCW(w) {
    let tmpTetra = data.tetraCopy(w.tetra);
    tetras.tetraRotateCW(tmpTetra);
    tryNewTetra(w, tmpTetra);
}
function ghostBlocks(w) {
    let tmpTetra = data.tetraCopy(w.tetra);
    tetras.tetraChangeColor(tmpTetra, [1, 1, 1]);
    // ok. make a copy of the world, too, then move ghost
    // tetra down in it, snag it, and return it
    let tmpWorld = data.worldCopy(w);
    tmpWorld.tetra = tmpTetra;
    worldJumpDown(tmpWorld);
    return tmpWorld.tetra;
}
function worldKeyMove(w, k) {
    switch (k) {
        case "left": {
            worldMove(aux.neg1, 0, w);
            break;
        }
        case "right": {
            worldMove(1, 0, w);
            break;
        }
        case "down": {
            worldJumpDown(w);
            break;
        }
        case "a": {
            worldRotateCCW(w);
            break;
        }
        case "s": {
            worldRotateCW(w);
            break;
        }
        default: {
            // do nothing
            break;
        }
    }
}
export {
    worldKeyMove,
    nextWorld,
    ghostBlocks
};