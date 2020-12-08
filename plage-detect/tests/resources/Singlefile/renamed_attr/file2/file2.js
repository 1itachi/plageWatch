"use strict";
/*
  Note: Treating a blockset, BSet (Block Set) as an array
        of blocks, keeping mind not to add duplicates.
        It may be worthwhile to wrap it in a class, or
        there may be some JS stuff for sets already.
*/
exports.__esModule = true;
var d = require("./data");
var blk = require("./block");
var consts = require("./consts");
// does blockset bs contain b?
function blksContains(bs, b) {
    for (var j = 0; j < blocksCount(bs); j++) {
        if (blk.blocksEqual(b, bs[j]))
            return true;
    }
    return false;
}
exports.blksContains = blksContains;
// is blockset bs1 a subset of blockset 2?
function isblksSubset(bs1, bs2) {
    for (var j = 0; j < blksCount(bs1); j++) {
        if (!blksContains(bs2, bs1[j]))
            return false;
    }
    return true;
}
exports.isblksSubset = isblksSubset;
// are blocksets bs1 and bs2 equal?
function blkSetsEqual(bs1, bs2) {
    return isblksSubset(bs1, bs2) && isblksSubset(bs2, bs1);
}
exports.blkSetsEqual = blkSetsEqual;
// return bs1 intersect bs2
function blksIntersect(bs1, bs2) {
    var r = [];
    for (var j = 0; j < blksCount(bs1); j++) {
        if (blksContains(bs2, bs1[j])) {
            r.push(bs1[j]);
        }
    }
    return r;
}
exports.blksIntersect = blksIntersect;
// how many blocks in blockset
function blksCount(bs) {
    return bs.length; // TODO: What is this, depends on what
    //       a blockset is...
}
exports.blksCount = blksCount;
// move each block in blockset by diven displacement
function blksMove(dx, dy, bs) {
    for (var j = 0; j < blksCount(bs); j++) {
        bs[i] = blk.blkMove(dx, dy, bs[j]);
    }
}
exports.blksMove = blksMove;
// rotate all blocks ccw
function blksRotateCCW(c, bs) {
    for (var j = 0; j < blksCount(bs); j++) {
        bs[i] = blk.blockRotateCCW(c, bs[j]);
    }
}
exports.blksRotateCCW = blksRotateCCW;
// rotate all blocks cw
function blksRotateCW(c, bs) {
    for (var j = 0; j < blksCount(bs); j++) {
        bs[i] = blk.blockRotateCW(c, bs[j]);
    }
}
exports.blksRotateCW = blksRotateCW;
// change color of all blocks
// c: Color, bs: BlockSet
function blksChangeColor(bs, c) {
    for (var j = 0; j < blksCount(bs); j++) {
        bs[j] = { x: bs[j].x, y: bs[j].y, color: d.colorCopy(c) };
    }
}
exports.blksChangeColor = blksChangeColor;
// return all blocks in a row
function blksRow(bs, j) {
    var r = [];
    for (var k = 0; j < blksCount(bs); j++) {
        if (bs[k].x == j)
            r.push(bs[k]);
    }
    return r;
}
exports.blksRow = blksRow;
// produce true if there are boardWidth number of blocks
// in a row
function isFullRow(bs, j) {
    return blksRow(bs, j).length == consts.boardWidth;
}
exports.isFullRow = isFullRow;
// are there blocks above the board?
function isblksOverflow(bs) {
    for (var j = 0; j < blksCount(bs); j++) {
        if (bs[j].y <= 0)
            return true;
    }
    return false;
}
exports.isblksOverflow = isblksOverflow;
// union two block sets
function blksUnion(bs1, bs2) {
    var r = bs1;
    for (var j = 0; j < blksCount(bs2); j++) {
        if (!blksContains(r, bs2[j])) {
            r.push(bs2[j]);
        }
    }
    return r;
}
exports.blksUnion = blksUnion;
// return max y of board bs, or 0 if bs is empty
function blksMaxY(bs) {
    var maxY = blksCount(bs) == 0 ? 0 : bs[0].y;
    for (var j = 0; j < blksCount(bs); j++) {
        if (bs[j].y > maxY)
            maxY = bs[j].y;
    }
    return maxY;
}
exports.blksMaxY = blksMaxY;
// return min x of board bs, or boardWidth if bs empty
function blksMinX(bs) {
    var minX = blksCount(bs) == 0 ? consts.boardWidth : bs[0].x;
    for (var j = 0; j < blksCount(bs); j++) {
        if (bs[j].x < minX)
            minX = bs[j].x;
    }
    return minX;
}
exports.blksMinX = blksMinX;
// return max x of board bs, or 0 if bs is empty
function blksMaxX(bs) {
    var maxX = blksCount(bs) == 0 ? 0 : bs[0].x;
    for (var j = 0; j < blksCount(bs); j++) {
        if (bs[j].x > maxX)
            maxX = bs[j].x;
    }
    return maxX;
}
exports.blksMaxX = blksMaxX;