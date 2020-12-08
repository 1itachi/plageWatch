"use strict";
/*
  Note: Treating a blockset, BSet (Block Set) as an array
        of blocks, keeping mind not to add duplicates.
        It may be worthwhile to wrap it in a class, or
        there may be some JS stuff for sets already.
*/
exports.__esModule = true;
var data = require("./data");
var block = require("./block");
var consts = require("./consts");
// does blockset bs contain b?
function blocksContains(bs, b) {
    for (var i = 0; i < blocksCount(bs); i++) {
        if (block.blocksEqual(b, bs[i]))
            return true;
    }
    return false;
}
exports.blocksContains = blocksContains;
// is blockset bs1 a subset of blockset 2?
function isBlocksSubset(bs1, bs2) {
    for (var i = 0; i < blocksCount(bs1); i++) {
        if (!blocksContains(bs2, bs1[i]))
            return false;
    }
    return true;
}
exports.isBlocksSubset = isBlocksSubset;
// are blocksets bs1 and bs2 equal?
function blockSetsEqual(bs1, bs2) {
    return isBlocksSubset(bs1, bs2) && isBlocksSubset(bs2, bs1);
}
exports.blockSetsEqual = blockSetsEqual;
// return bs1 intersect bs2
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
// how many blocks in blockset
function blocksCount(bs) {
    return bs.length; // TODO: What is this, depends on what
    //       a blockset is...
}
exports.blocksCount = blocksCount;
// move each block in blockset by diven displacement
function blocksMove(dx, dy, bs) {
    for (var i = 0; i < blocksCount(bs); i++) {
        bs[i] = block.blockMove(dx, dy, bs[i]);
    }
}
exports.blocksMove = blocksMove;
// rotate all blocks ccw
function blocksRotateCCW(c, bs) {
    for (var i = 0; i < blocksCount(bs); i++) {
        bs[i] = block.blockRotateCCW(c, bs[i]);
    }
}
exports.blocksRotateCCW = blocksRotateCCW;
// rotate all blocks cw
function blocksRotateCW(c, bs) {
    for (var i = 0; i < blocksCount(bs); i++) {
        bs[i] = block.blockRotateCW(c, bs[i]);
    }
}
exports.blocksRotateCW = blocksRotateCW;
// change color of all blocks
// c: Color, bs: BlockSet
function blocksChangeColor(bs, c) {
    for (var i = 0; i < blocksCount(bs); i++) {
        bs[i] = { x: bs[i].x, y: bs[i].y, color: data.colorCopy(c) };
    }
}
exports.blocksChangeColor = blocksChangeColor;
// return all blocks in a row
function blocksRow(bs, i) {
    var r = [];
    for (var k = 0; i < blocksCount(bs); i++) {
        if (bs[k].x == i)
            r.push(bs[k]);
    }
    return r;
}
exports.blocksRow = blocksRow;
// produce true if there are boardWidth number of blocks
// in a row
function isFullRow(bs, i) {
    return blocksRow(bs, i).length == consts.boardWidth;
}
exports.isFullRow = isFullRow;
// are there blocks above the board?
function isBlocksOverflow(bs) {
    for (var i = 0; i < blocksCount(bs); i++) {
        if (bs[i].y <= 0)
            return true;
    }
    return false;
}
exports.isBlocksOverflow = isBlocksOverflow;
// union two block sets
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
// return max y of board bs, or 0 if bs is empty
function blocksMaxY(bs) {
    var maxY = blocksCount(bs) == 0 ? 0 : bs[0].y;
    for (var i = 0; i < blocksCount(bs); i++) {
        if (bs[i].y > maxY)
            maxY = bs[i].y;
    }
    return maxY;
}
exports.blocksMaxY = blocksMaxY;
// return min x of board bs, or boardWidth if bs empty
function blocksMinX(bs) {
    var minX = blocksCount(bs) == 0 ? consts.boardWidth : bs[0].x;
    for (var i = 0; i < blocksCount(bs); i++) {
        if (bs[i].x < minX)
            minX = bs[i].x;
    }
    return minX;
}
exports.blocksMinX = blocksMinX;
// return max x of board bs, or 0 if bs is empty
function blocksMaxX(bs) {
    var maxX = blocksCount(bs) == 0 ? 0 : bs[0].x;
    for (var i = 0; i < blocksCount(bs); i++) {
        if (bs[i].x > maxX)
            maxX = bs[i].x;
    }
    return maxX;
}
exports.blocksMaxX = blocksMaxX;