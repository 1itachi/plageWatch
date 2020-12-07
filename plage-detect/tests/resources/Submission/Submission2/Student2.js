// Check direct plagiarism

"use strict";
/* File: index.ts
Author: Jason Doppelganger Lu (lu.jaso2@northeastern.edu)
Fall 2020: Foundations of Software Engineering
Dates: 8/17/2020 - 9/16/2020
HW 0
*/
exports.__esModule = true;
exports.martianFactory = exports.Martian = void 0;
// index.ts
/* Solution for the Space Invaders problem.
Using PDP style (CS 5010) for solution. */
// Classes for spaceship and martian
// export type Spaceship = MotherShip | Drone
/* export class Martian {
    name: string;
    constructor(martianName: string) {
        this.name = martianName;
    }
} */
/*
export class MotherShip {
    name: string;
    crew: Martian[];
    daughterShips?: Spaceship[];
    // make constructor here.
    constructor(theName: string, theCrew: Martian[],
        theDaughterShips?: Spaceship[]) {
        this.name = theName;
        this.crew = theCrew;
        this.daughterShips = theDaughterShips;
    }
}
export class Drone {
    // no attributes
    constructor() {
    }
}
// Utility functions:
// Function that creates a new drone
// @param: none
// @return: none
export function droneFactory(): Spaceship {
    let drone = new Drone();
    return drone;
}
// Function that creates a new mother ship
// @param name: the name of the mother ship.
// @param crew: the Martian list crew.
// @param daughterShips? : possible daughter ships of the mother ship.
export function mothershipFactory(name: string, crew: Martian[],
    daughterShips?: Spaceship[]): Spaceship {
    let mothership = new MotherShip(name, crew, daughterShips);
    return mothership;
}
*/
// Function that creates a new Martian
/* export function martianFactory(name: string): Martian {
    // declare as a new type
    console.log(name);
    // let martian = new Martian(name);
    return new Martian(name);
} */
/*
// Function that returns the daughter ships of a ship. If the
// ship is a drone, this function should return an empty array.
export function getDaughterShips(ship: Spaceship): Spaceship[] {
    if (ship === Drone) {
        return [];
    }
    let daughter = ship as MotherShip;
    console.log(daughter.daughterShips);
    return daughter.daughterShips;
}
// Main functions
// Function that returns true if and only if the spaceship
// has a Martian named "Mork" in its crew.
export function hasMork(ship: Spaceship): boolean {
    if (ship === Drone) {
        return false;
    }
    let morkShip = ship as MotherShip;
    let crew = morkShip.crew;
    for (let i in crew) {
        if (crew[i].name === "Mork") {
            return true;
        } else {
            return false;
        }
    }
    return false;
}
// Function that returns the total number of Martians named "Mork"
// in its crews of either spaceship or its fleet.
export function totalMorks(ship: Spaceship): number {
    // set up an counter of Morks
    let count = 0;
    let morkDaughterShip = ship as MotherShip;
    let crew = morkDaughterShip.crew;
    let daughters = morkDaughterShip.daughterShips;
    // check for mork in its crews for spaceship
    for (var i in morkDaughterShip) {
        if (hasMork(i) === true) {
            // add to the array here
            count += 1;
        }
        console.log("i is", i);
    }
    for (var i in daughters) {
        if (hasMork(daughters) === true) {
            count += 1;
        }
    }
    // check for mork in its fleet
    return count;
}
// Returns another spaceship just like the original, except
// that all of its daughters that are drones have been removed.
// If the ship specified is not a mother ship, this function
// should return undefined.
export function shipWithoutDrones(ship: Spaceship): Spaceship {
    if (ship !== MotherShip) {
        return undefined;
    }
    // get the daughter ships
    let possibleDrones = getDaughterShips(ship);
    for (let i in possibleDrones) {
        if (possibleDrones[i] === Drone) {
            // filter to remove the drone from daughter ship
            possibleDrones.filter(drone => drone === Drone);
        }
    }
    // figure out the syntax later
    return possibleDrones;
}
// Returns that returns another spaceship just like the original,
// except that all of the drones in its fleet have been removed. If
// the ship specified is not a mother ship, this function should
// return undefined.
export function shipWithoutDeepDrones(ship: Spaceship): Spaceship {
    // if not a mother ship, this function returns undefined.
    if (ship !== MotherShip) {
        return undefined;
    }
    let deepDroneList: Spaceship[];
    // remove drones from fleet
    let removedDrones = deepDroneList.filter(drone => drone === Drone);
    // remove drones from daughter ships as well
    let possibleDaughterDrones = getDaughterShips(ship);
    for (let i in possibleDaughterDrones) {
        if (possibleDaughterDrones[i] === Drone) {
            removedDrones.filter(drone => drone === Drone);
        }
    }
    return removedDrones;
}
// Function that returns another spaceship just like the original,
// except that every ship in its fleet who has a crewmember named "Mork"
// has been removed. When a ship is removed from the fleet, so are all
// its daughters and their fleets. If the ship initially specified
// as the parameter to this function contains Mork, this function should
// return undefined.
export function shipWithoutDeepMorks(ship: Spaceship): Spaceship {
    // the ship initially specified contains a Martian named Mork
    if (hasMork(ship) === true) {
        return undefined;
    }
    // get the crew in the fleet
    let mothership = new MotherShip("Mork", [], []);
    let daughterFleet = getDaughterShips(ship);
    let crewFleet = mothership.crew;
    for (let i in crewFleet) {
        if (hasMork(crewFleet[i]) === true) {
            daughterFleet.filter(drone => drone === hasMork(crewFleet));
        }
    }
    return crewFleet;
}
// Function that returns another ship just like the original, expect
// that all of its daughters who have a crewmember named "Mork" has
// been removed. However, when a daughter is removed from the fleet,
// each of its daughters (a grand daughter of a given spaceship) are
// promoted to become a daughter of the given spaceship, even if it
// has a Mork in its crew. Note that this function ONLY checks the
// daughter ships of the specified (not the entire fleet). If the
// ship initially specified as the parameter to this function contains
// Mork, this function should return undefined.
export function shipWithoutMorksButPromoteTheirDaughters
    (ship: Spaceship):
    Spaceship {
    if (ship === hasMork) {
        return undefined;
    }
    // remove the crewmember named "Mork" from the daughter ships.
    let mothership = new MotherShip("Mork", [], []);
    let crewmember = mothership.crew;
    let promotedDaughters = getDaughterShips(ship);
    for (let i in promotedDaughters) {
        if (promotedDaughters[i] === hasMork(crewmember[i])) {
            promotedDaughters.filter(mork => mork === hasMork);
        }
    }
    // promotion of daughter ships
    for (let i in promotedDaughters) {
        promotedDaughters.push(i);
    }
    return promotedDaughters;
}
*/

// Check plagiarism for different files.
function touchdown(w) {
    // pick a random tetra
    var randomTetra = aux.listPickRandom(aux.tetraBlocks);
    w.tetra = randomTetra;
    var newBlocks = bset.blocksUnion(w.tetra.blocks, w.blocks);
    elim.eliminateFullRows(newBlocks);
    w.blocks = newBlocks;
}

console.log(touchdown(100));

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

// Checked moved code

"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var index_1 = require("./index");

// tests for reduce
describe('illustration of reduce', function () {
    testequal('[3,4,5].reduce(sub,0)=-12', [3, 4, 5].reduce(index_1.sub, 0), -12);
    testequal('how did it get that?  Let\'s see', 1, 1);
    testequal('sub(0,3) = -3', index_1.sub(0, 3), -3);
    testequal('sub(-3,4) = -7', index_1.sub(-3, 4), -7);
    testequal('sub(-7,5) = -12', index_1.sub(-7, 5), -12);
});

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

// Check for renamed variables

function binarySearch(myArray, value) {
    let left = 0;
    let right = myArray.length - 1;
    let middle = parseInt((myArray.length - 1) / 2)
    while (left <= right) {
        if (myArray[middle] === value) {
            return middle;
        } else if (myArray[middle] < value) {
            left = middle + 1;
            middle = parseInt((left + right) / 2);
        } else if (myArray[middle] > value) {
            right = middle - 1;
            middle = parseInt((left + right) / 2);
        }
    }
    return -1;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 16], 51))

// Check for loop structure change and test case plagiarism.
// Changed comment: Author: Joe Smith (Naive fibonacci)
function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2)
    }
}
// plagiarism in the test case
var copied1 = fibonacci(50);
console.log(copied1);

// Check for extracted code

let expr = (5 + 10) * 9
let constant = 18
console.log("hello1")
console.log("hello2")
console.log("hello3");
console.log("hello4")

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
function martianFactoryRenamed(name) {
    // declare as a new type
    console.log(name);
    // let martian = new Martian(name);
    return new Martian(name);
}

// Check for function re-ordered.

exports.Martian = Martian;
exports.martianFactoryRenamed = martianFactoryRenamed;
var martian = new Martian("Mork");
console.log(martian);

// Check for null.
                                    // bye.
