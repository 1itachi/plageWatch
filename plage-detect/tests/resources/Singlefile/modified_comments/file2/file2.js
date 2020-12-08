"use strict";
/*
  Note: A BSet (Block Set) is an set of blocks
*/
exports.__esModule = true;
var data = require("./data");
var block = require("./block");
var consts = require("./consts");

/**
 * Checks if a blockset contians a block
 * @param bs block set
 * @param b the block which is being checked
 * @returns {boolean} truw iff the blockset contains the block
 */
function blocksContains(bs, b) {
    for (var i = 0; i < blocksCount(bs); i++) {
        if (block.blocksEqual(b, bs[i]))
            return true;
    }
    return false;
}
exports.blocksContains = blocksContains;

/**
 * Checks if a blockset is a subset of another block set
 * @param bs1 a blockset
 * @param bs2 another blockset
 * @returns {boolean} true iff the blockset is a subset of the other blockset
 */
function isBlocksSubset(bs1, bs2) {
    for (var i = 0; i < blocksCount(bs1); i++) {
        if (!blocksContains(bs2, bs1[i]))
            return false;
    }
    return true;
}
exports.isBlocksSubset = isBlocksSubset;

/**
 * Checks if two blocksets are equal
 * @param bs1 a blockset
 * @param bs2 another blockset
 * @returns {boolean} true iff the 2 blocksets are equal
 */
function blockSetsEqual(bs1, bs2) {
    return isBlocksSubset(bs1, bs2) && isBlocksSubset(bs2, bs1);
}
exports.blockSetsEqual = blockSetsEqual;


/**
 * Computes the intersection of 2 blocksets
 * @param bs1 a bloackset
 * @param bs2 another blockset
 * @returns {Array} the intersection of the two blocksets
 */
function blocksIntersect(bs1, bs2) {
    var r = [];
    for (var i = 0; i < blocksCount(bs1); i++) {
        if (blocksContains(bs2, bs1[i])) {
            r.push(bs1[i]);
        }
    }
    return r;
}
exports.blocksIntersect = blocksIntersect;

/**
 * Returns size of a blockset
 * @param bs the blockset
 * @returns {number} The size of the blockset
 */
function blocksCount(bs) {
    return bs.length;
}
exports.blocksCount = blocksCount;

/**
 * Move each block in blockset by the given displacement
 * @param dx x displacement
 * @param dy y displacement
 * @param bs the bloackset
 */
function blocksMove(dx, dy, bs) {
    for (var i = 0; i < blocksCount(bs); i++) {
        bs[i] = block.blockMove(dx, dy, bs[i]);
    }
}
exports.blocksMove = blocksMove;

/**
 * Rotate blocks counterclockwise
 * @param c
 * @param bs blockset
 */
function blocksRotateCCW(c, bs) {
    for (var i = 0; i < blocksCount(bs); i++) {
        bs[i] = block.blockRotateCCW(c, bs[i]);
    }
}
exports.blocksRotateCCW = blocksRotateCCW;

/**
 * Rotate all blocks counterclockwise
 * @param c
 * @param bs the blockset
 */
function blocksRotateCW(c, bs) {
    for (var i = 0; i < blocksCount(bs); i++) {
        bs[i] = block.blockRotateCW(c, bs[i]);
    }
}
exports.blocksRotateCW = blocksRotateCW;

/**
 * Change color of blockset
 * @param bs blockset
 * @param c color
 */
function blocksChangeColor(bs, c) {
    for (var i = 0; i < blocksCount(bs); i++) {
        bs[i] = { x: bs[i].x, y: bs[i].y, color: data.colorCopy(c) };
    }
}
exports.blocksChangeColor = blocksChangeColor;

/**
 * Fetch the blocks in a row
 * @param bs blockset
 * @param i row number
 * @returns {Array} the blocks in row i
 */
function blocksRow(bs, i) {
    var r = [];
    for (var k = 0; i < blocksCount(bs); i++) {
        if (bs[k].x == i)
            r.push(bs[k]);
    }
    return r;
}
exports.blocksRow = blocksRow;

/**
 * Check if a row is full (boardWidth number of blocks in a row)
 * @param bs blockset
 * @param i row number
 * @returns {boolean} true iff the row is full
 */
function isFullRow(bs, i) {
    return blocksRow(bs, i).length == consts.boardWidth;
}
exports.isFullRow = isFullRow;
/**
 * Checks if there are blocks above the board
 * @param bs the blockset
 * @returns {boolean} true iff there are blocks above the board
 */
function isBlocksOverflow(bs) {
    for (var i = 0; i < blocksCount(bs); i++) {
        if (bs[i].y <= 0)
            return true;
    }
    return false;
}
exports.isBlocksOverflow = isBlocksOverflow;

// union two block sets
/**
 * Computes union of 2 blocksets
 * @param bs1 blockset
 * @param bs2 another blockset
 * @returns {blockset} union of the two blocksets
 */
function blocksUnion(bs1, bs2) {
    var r = bs1;
    for (var i = 0; i < blocksCount(bs2); i++) {
        if (!blocksContains(r, bs2[i])) {
            r.push(bs2[i]);
        }
    }
    return r;
}
exports.blocksUnion = blocksUnion;

/**
 * Gets max y in blockset
 * @param bs the blockset
 * @returns {number} the max y in given blockset, 0 if empty set
 */
function blocksMaxY(bs) {
    var maxY = blocksCount(bs) == 0 ? 0 : bs[0].y;
    for (var i = 0; i < blocksCount(bs); i++) {
        if (bs[i].y > maxY)
            maxY = bs[i].y;
    }
    return maxY;
}
exports.blocksMaxY = blocksMaxY;

/**
 * Fetches minimum x of blockset
 * @param bs the blockset
 * @returns {number} the min x of blockset, boardWidth if empty set
 */
function blocksMinX(bs) {
    var minX = blocksCount(bs) == 0 ? consts.boardWidth : bs[0].x;
    for (var i = 0; i < blocksCount(bs); i++) {
        if (bs[i].x < minX)
            minX = bs[i].x;
    }
    return minX;
}
exports.blocksMinX = blocksMinX;

/**
 * Fetches maximum x of blockset
 * @param bs the blockset
 * @returns {number} the max x of blockset, 0 if empty set
 */
function blocksMaxX(bs) {
    var maxX = blocksCount(bs) == 0 ? 0 : bs[0].x;
    for (var i = 0; i < blocksCount(bs); i++) {
        if (bs[i].x > maxX)
            maxX = bs[i].x;
    }
    return maxX;
}
exports.blocksMaxX = blocksMaxX;