"use strict";
// the game file
exports.__esModule = true;
var d = require("./d");
var blockSet = require("./blockSet");
var tetras = require("./tetras");
var aux = require("./aux");
var elim = require("./elim");
var consts = require("./consts");
// this changes w
// add the current tetra's blocks onto the world's block list
function addToWorld(w) {
    // pick a random tetra
    w.tetra = aux.listPickRandom(aux.tetraBlocks);
    var newBlks = blockSet.blocksUnion(w.tetra.blocks, w.blocks);
    elim.eliminateFullRows(newBlks);
    w.blocks = newBlks;
}
// has the current tetra landed on any blocks?
// need to make a tmp tetra for this
function didLandOnBlocks(w) {
    var tmpTetra = d.tetraCopy(w.tetra);
    tetras.tetraMove(0, 1, tmpTetra);
    return tetras.doesTetraOverlapsBlocks(tmpTetra, w.blocks);
}
function didLandOnFloor(w) {
    return blockSet.blocksMaxY(w.tetra.blocks) == (consts.boardHeight - 1);
}
function didLanded(w) {
    return didLandOnFloor(w) || didLandOnBlocks(w);
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
function worldAtNextTick(w) {
    if (didLanded(w)) {
        addToWorld(w);
    }
    else {
        tetras.tetraMove(0, 1, w.tetra);
    }
}
exports.worldAtNextTick = worldAtNextTick;
function tryNewTetra(w, newTetra) {
    if (blockSet.blocksMinX(newTetra.blocks) < 0 ||
        blockSet.blocksMaxX(newTetra.blocks) >= consts.boardWidth ||
        tetras.doesTetraOverlapsBlocks(newTetra, w.blocks)) {
        // do nothing
    }
    else {
        // update world's tetra
        w.tetra = newTetra;
    }
}
// move w.tetra by dx, dy, but only if you can
function moveWorld(dx, dy, w) {
    var tmpTetra = d.tetraCopy(w.tetra);
    tetras.tetraMove(dx, dy, tmpTetra);
    tryNewTetra(w, tmpTetra);
}
// try to rotate ccw
function rotateWorldCCW(w) {
    var tmpTetra = d.tetraCopy(w.tetra);
    tetras.tetraRotateCCW(tmpTetra);
    tryNewTetra(w, tmpTetra);
}
function rotateWorldCW(w) {
    var tmpTetra = d.tetraCopy(w.tetra);
    tetras.tetraRotateCW(tmpTetra);
    tryNewTetra(w, tmpTetra);
}
function ghostBlocks(w) {
    var tmpTetra = d.tetraCopy(w.tetra);
    tetras.tetraChangeColor(tmpTetra, [1, 1, 1]);
    // ok. make a copy of the world, too, then move ghost
    // tetra down in it, snag it, and return it
    var tmpWorld = d.worldCopy(w);
    tmpWorld.tetra = tmpTetra;
    worldJumpDown(tmpWorld);
    return tmpWorld.tetra;
}
exports.ghostBlocks = ghostBlocks;
function onKey(w, k) {
    switch (k) {
        case "left": {
            moveWorld(aux.neg1, 0, w);
            break;
        }
        case "right": {
            moveWorld(1, 0, w);
            break;
        }
        case "down": {
            worldJumpDown(w);
            break;
        }
        case "a": {
            rotateWorldCCW(w);
            break;
        }
        case "s": {
            rotateWorldCW(w);
            break;
        }
        default: {
            // do nothing
            break;
        }
    }
}
exports.onKey = onKey;