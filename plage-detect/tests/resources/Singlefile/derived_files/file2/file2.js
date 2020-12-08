"use strict";
/*
  Note: Treating a blockset, BSet (Block Set) as an array
        of blocks, keeping mind not to add duplicates.
        It may be worthwhile to wrap it in a class, or
        there may be some JS stuff for sets already.
*/
exports.__esModule = true;
let data = require("./data");
let block = require("./block");
let consts = require("./consts");
// does blockset bs contain b?
function blocksContains(bs, b) {
    for (let i = 0; i < blocksCount(bs); i++) {
        if (block.blocksEqual(b, bs[i]))
            return true;
    }
    return false;
}
// is blockset bs1 a subset of blockset 2?
function isBlocksSubset(bs1, bs2) {
    for (let i = 0; i < blocksCount(bs1); i++) {
        if (!blocksContains(bs2, bs1[i]))
            return false;
    }
    return true;
}
// are blocksets bs1 and bs2 equal?
function blockSetsEqual(bs1, bs2) {
    return isBlocksSubset(bs1, bs2) && isBlocksSubset(bs2, bs1);
}
// return bs1 intersect bs2
function blocksIntersect(bs1, bs2) {
    let r = [];
    for (let i = 0; i < blocksCount(bs1); i++) {
        if (blocksContains(bs2, bs1[i])) {
            r.push(bs1[i]);
        }
    }
    return r;
}
// how many blocks in blockset
function blocksCount(bs) {
    return bs.length; // TODO: What is this, depends on what
    //       a blockset is...
}
// move each block in blockset by diven displacement
function blocksMove(dx, dy, bs) {
    for (let i = 0; i < blocksCount(bs); i++) {
        bs[i] = block.blockMove(dx, dy, bs[i]);
    }
}
// rotate all blocks ccw
function blocksRotateCCW(c, bs) {
    for (let i = 0; i < blocksCount(bs); i++) {
        bs[i] = block.blockRotateCCW(c, bs[i]);
    }
}
// rotate all blocks cw
function blocksRotateCW(c, bs) {
    for (let i = 0; i < blocksCount(bs); i++) {
        bs[i] = block.blockRotateCW(c, bs[i]);
    }
}
// change color of all blocks
// c: Color, bs: BlockSet
function blocksChangeColor(bs, c) {
    for (let i = 0; i < blocksCount(bs); i++) {
        bs[i] = { x: bs[i].x, y: bs[i].y, color: data.colorCopy(c) };
    }
}
// return all blocks in a row
function blocksRow(bs, i) {
    let r = [];
    for (let k = 0; i < blocksCount(bs); i++) {
        if (bs[k].x === i)
            r.push(bs[k]);
    }
    return r;
}
// produce true if there are boardWidth number of blocks
// in a row
function isFullRow(bs, i) {
    return blocksRow(bs, i).length === consts.boardWidth;
}
// are there blocks above the board?
function isBlocksOverflow(bs) {
    for (let i = 0; i < blocksCount(bs); i++) {
        if (bs[i].y <= 0)
            return true;
    }
    return false;
}
// union two block sets
function blocksUnion(bs1, bs2) {
    let r = bs1;
    for (let i = 0; i < blocksCount(bs2); i++) {
        if (!blocksContains(r, bs2[i])) {
            r.push(bs2[i]);
        }
    }
    return r;
}
// return max y of board bs, or 0 if bs is empty
function blocksMaxY(bs) {
    let maxY = blocksCount(bs) === 0 ? 0 : bs[0].y;
    for (let i = 0; i < blocksCount(bs); i++) {
        if (bs[i].y > maxY)
            maxY = bs[i].y;
    }
    return maxY;
}
// return min x of board bs, or boardWidth if bs empty
function blocksMinX(bs) {
    let minX = blocksCount(bs) === 0 ? consts.boardWidth : bs[0].x;
    for (let i = 0; i < blocksCount(bs); i++) {
        if (bs[i].x < minX)
            minX = bs[i].x;
    }
    return minX;
}
// return max x of board bs, or 0 if bs is empty
function blocksMaxX(bs) {
    let maxX = blocksCount(bs) === 0 ? 0 : bs[0].x;
    for (let i = 0; i < blocksCount(bs); i++) {
        if (bs[i].x > maxX)
            maxX = bs[i].x;
    }
    return maxX;
}

export {
    blocksContains,
    isBlocksSubset,
    blockSetsEqual,
    blocksIntersect,
    blocksCount,
    blocksMove,
    blocksRotateCCW,
    blocksRotateCW,
    blocksChangeColor,
    blocksRow,
    isFullRow,
    isBlocksOverflow,
    blocksUnion,
    blocksMaxY,
    blocksMinX,
    blocksMaxX
};