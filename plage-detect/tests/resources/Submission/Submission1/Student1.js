// Check Direct Plagiarism

"use strict";
/* File: index.ts
Author: Jason Doppelganger Lu (lu.jaso2@northeastern.edu)
Fall 2020: Foundations of Software Engineering
Dates: 8/17/2020 - 9/16/2020
HW 0
*/
exports.__esModule = true;
exports.martianFactory = exports.Martian = void 0;

// check plagiarism for moved codes.
var Martian = /** @class */ (function () {
    function Martian(theName) {
        this.name = theName;
    }
    return Martian;
}());
exports.Martian = Martian;
var martian = new Martian("Mork");
console.log(martian);
function martianFactory(name) {
    // declare as a new type
    console.log(name);
    // let martian = new Martian(name);
    return new Martian(name);
}
exports.martianFactory = martianFactory;

// Check moved code.

"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var index_1 = require("./index");
describe('illustrations of equality', function () {
    it('Compare dup(13) with [13,13] via .equal ==> false,[13, 13]', function () {
        chai_1.assert.notEqual(index_1.duplicate(13), [13, 13]);
    });
    it('Compare dup(13) with [13,13] via (==); result is false', function () {
        chai_1.assert.isFalse(index_1.duplicate(13) == [13, 13]);
    });
    it('Compare dup(13) and [13,13] with deepEqual ==> true', function () {
        chai_1.assert.deepEqual(index_1.duplicate(13), [13, 13]);
    });
    it('[[12, 12] notEqual [13,13]', function () {
        chai_1.assert.notEqual([12, 13].map(index_1.duplicate), [[12, 12], [13, 13]]);
    });
    it('[[12, 12], [13,13] using assert.deepEqual', function () {
        chai_1.assert.deepEqual([12, 13].map(index_1.duplicate), [[12, 12], [13, 13]]);
    });
});
// functions like these are handy in your test files
function testDeepEqual(testname, actual, correct) {
    it(testname, function () { chai_1.assert.deepEqual(actual, correct); });
}
function testequal(testname, actual, correct) {
    it(testname, function () { chai_1.assert.equal(actual, correct); });
}
// tests for reduce
describe('illustration of reduce', function () {
    testequal('[3,4,5].reduce(sub,0)=-12', [3, 4, 5].reduce(index_1.sub, 0), -12);
    testequal('how did it get that?  Let\'s see', 1, 1);
    testequal('sub(0,3) = -3', index_1.sub(0, 3), -3);
    testequal('sub(-3,4) = -7', index_1.sub(-3, 4), -7);
    testequal('sub(-7,5) = -12', index_1.sub(-7, 5), -12);
});

// Check for renamed variables.

function binarySearch(myArray, value) {
    let l = 0;
    let r = myArray.length - 1;
    let m = parseInt((myArray.length - 1) / 2)
    while (l <= r) {
        if (myArray[middle] === value) {
            return m;
        } else if (myArray[m] < value) {
            l = m + 1;
            m = parseInt((l + r) / 2);
        } else if (myArray[m] > value) {
            r = m - 1;
            m = parseInt((l + r) / 2);
        }
    }
    return -1;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 16], 51))

// Check for loop structure change and test case plagiarism.

// Changed Comment: Author: Jason Lu (Fibonacci iterative).
function fibonacci(n) {
    // memoization array
    let arr = [0, 1];
    for (let i = 2; i < n + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1])
    }
    return arr[n];
}
// plagiarism in the test case
let copy1 = fibonacci(50);
console.log(copy1);

// Check for extracted code

let expr = 9 * (5 + 10)
let constant = 18
console.log("hello4")
console.log("hello3")
console.log("hello2");
console.log("hello1")

// Extracted code here.
function fibonacciRenamed(n) {
    if (number <= 1) {
        return n;
    } else {
        return fibonacciRenamed(number - 1) + fibonacci(number - 2)
    }
}

// Check for function renamed.

// check plagiarism for function swap.
function martianFactoryRenamed1(name) {
    // declare as a new type
    console.log(name);
    // let martian = new Martian(name);
    return new Martian(name);
}

// Check for function re-ordered.

// check plagiarism via function reordering.
function martianFactoryOrdered(name) {
    // declare as a new type
    console.log(name);
    // let martian = new Martian(name);
    return new Martian(name);
}

// Check for different files.
// does blockset bs contain b?
function blocksContains(bs, b) {
    for (var i = 0; i < blocksCount(bs); i++) {
        if (block.blocksEqual(b, bs[i]))
            return true;
    }
    return false;
}

console.log(blocksContains(5, 6));

var martian = new Martian("Mork");
console.log(martian);
exports.Martian = Martian;
exports.martianFactoryRenamed = martianFactoryRenamed;

// Check for null.
                                                    // hi
