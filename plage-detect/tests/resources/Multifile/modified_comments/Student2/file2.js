"use strict";
// the game file
exports.__esModule = true;
var data = require("./data");
var bset = require("./bset");
var tetras = require("./tetras");
var aux = require("./aux");
var elim = require("./elim");
var consts = require("./consts");
/**
 * Changes the world. Adds the current tetra's blocks onto the world's block list
 * @param w the world
 */
function touchdown(w) {
    // pick a random tetra
    var randomTetra = aux.listPickRandom(aux.tetraBlocks);
    w.tetra = randomTetra;
    var newBlocks = bset.blocksUnion(w.tetra.blocks, w.blocks);
    elim.eliminateFullRows(newBlocks);
    w.blocks = newBlocks;
}

/**
 * Has the current tetra landed on any blocks?
 * need to make a tmp tetra for this
 * @param w the world
 * @returns {boolean} true iff the tetra lands on a block
 */
function didLandedOnBlocks(w) {
    var tmpTetra = data.tetraCopy(w.tetra);
    tetras.tetraMove(0, 1, tmpTetra);
    return tetras.doesTetraOverlapsBlocks(tmpTetra, w.blocks);
}

/**
 * Computes if the tetra has landed on the floor
 * @param w the world
 * @returns {boolean} true iff the tetra landed on the floor
 */
function didLandedOnFloor(w) {
    return bset.blocksMaxY(w.tetra.blocks) == (consts.boardHeight - 1);
}

/**
 * Computes if the tetra has landed
 * @param w the world
 * @returns {boolean} true iff a tetra landed
 */
function didLanded(w) {
    return didLandedOnFloor(w) || didLandedOnBlocks(w);
}

/**
 * Moves the tetra to the floor (end)
 * @param w the world
 */
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

/**
 * The world in the next tick
 * @param w the world
 */
function nextWorld(w) {
    if (didLanded(w)) {
        touchdown(w);
    }
    else {
        tetras.tetraMove(0, 1, w.tetra);
    }
}
exports.nextWorld = nextWorld;

/**
 * Try to add a new tetra to the world
 * @param w the world
 * @param newTetra the new tetra
 */
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
/**
 * Displace terra by given input, if possible
 * @param dx s displacement
 * @param dy y displacement
 * @param w world
 */
function worldMove(dx, dy, w) {
    var tmpTetra = data.tetraCopy(w.tetra);
    tetras.tetraMove(dx, dy, tmpTetra);
    tryNewTetra(w, tmpTetra);
}

/**
 * Rotate world counterclockwise
 * @param w the world
 */
function worldRotateCCW(w) {
    var tmpTetra = data.tetraCopy(w.tetra);
    tetras.tetraRotateCCW(tmpTetra);
    tryNewTetra(w, tmpTetra);
}

/**
 * Rotate world clockwise
 * @param w the world
 */
function worldRotateCW(w) {
    var tmpTetra = data.tetraCopy(w.tetra);
    tetras.tetraRotateCW(tmpTetra);
    tryNewTetra(w, tmpTetra);
}

/**
 * Ghost unaccessible blocks
 * @param w the world
 * @returns {*}
 */
function ghostBlocks(w) {
    var tmpTetra = data.tetraCopy(w.tetra);
    tetras.tetraChangeColor(tmpTetra, [1, 1, 1]);
    // ok. make a copy of the world, too, then move ghost
    // tetra down in it, snag it, and return it
    var tmpWorld = data.worldCopy(w);
    tmpWorld.tetra = tmpTetra;
    worldJumpDown(tmpWorld);
    return tmpWorld.tetra;
}
exports.ghostBlocks = ghostBlocks;

/**
 * Perform action according to key press
 * @param w the world
 * @param k the action to perform
 */
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
exports.worldKeyMove = worldKeyMove;