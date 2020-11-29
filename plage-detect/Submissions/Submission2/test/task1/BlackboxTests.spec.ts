import { expect } from 'chai';
import BubbleSorter from '../../src/provided/BubbleSorter';
import SorterFactory from "../../src/SorterFactory";
const sorterFactory = new SorterFactory();

/**
 * This is not a very good test, but is provided as an example of how
 * to implement a test on the sorter. Implement your task 1 tests here, and feel
 * free to replace this one.
 */
describe("blackbox tests for sorter", () => {
    let sorter = sorterFactory.createSorter();

    class product {
        name: string;
        price: number;
        constructor(name: string, price: number) {
            this.name = name;
            this.price = price;
        }
    }
    const bread = new product('bread', 12);
    const pen = new product('pen', 20);
    const coffee = new product('coffee', 10);
    const pizza = new product('pizza', 5);
    const ramen = new product('ramen', 15);

    it("call sorter on small array of numbers", () => {
        let list = [4, 1, 2];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([1, 2, 4]);
    });

    it("call sorter on sorted array of numbers", () => {
        let list = [1, 2, 3, 4, 5];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([1, 2, 3, 4, 5]);
    });
    it("call sorter on desc sorted array of numbers", () => {
        let list = [5, 4, 3, 2, 1];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([1, 2, 3, 4, 5]);
    });

    it("call sorter on array of numbers with infinity", () => {
        let list = [10, Number.NEGATIVE_INFINITY, -2, 4, Number.POSITIVE_INFINITY, 2, -1, -1, 0];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([-Infinity, -2, -1, -1, 0, 2, 4, 10, Infinity]);
    });
    it("call sorter on array with 0s", () => {
        let list = [5, 4, 0, 2, 0];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([0, 0, 2, 4, 5]);
    });

    it("call sorter on array with consecutive adjacent values without swap", () => {
        let list = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 6];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]);
    });

    it("call sorter on array with equal adjacent values", () => {
        let list = [5, 5, 3, 3, 10, 10, 1, 1];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([1, 1, 3, 3, 5, 5, 10, 10]);
    });
    it("call sorter on array with negative values", () => {
        let list = [-4, -3, -7, -1, -9, -2];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([-9, -7, -4, -3, -2, -1]);
    });

    it("call sorter on array with negative values and sort in descending order", () => {
        let list = [-4, -3, -7, -1, -9, -2];
        sorter.sort(list, (s1: number, s2: number) => s2 - s1);
        expect(list).to.have.ordered.members([-1, -2, -3, -4, -7, -9]);
    });

    it("call sorter on array with negative values and positive", () => {
        let list = [-4, 0, -3, -7, 7, -1, -9, 9, 10, -2];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([-9, -7, -4, -3, -2, -1, 0, 7, 9, 10]);
    });

    it("call sorter on long array", () => {
        let list = [];
        for (let i = 10999; i >= 0; i--) {
            list.push(i);
        }
        let check = [];
        for (let i = 0; i < 11000; i++) {
            check.push(i);
        }
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members(check);
    });

    it("call sorter on array of numbers as a string", () => {
        let list = ['-4', '0', '-3', '-7', '7', '-1', '-9', '9', '10', '-2'];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members(['-9', '-7', '-4', '-3', '-2', '-1', '0', '7', '9', '10']);
    });

    it("call sorter on array of numbers as a string and words", () => {
        let list = ['-4', '0', '-3', '-7', '7', '-1', 'abcd', 'efg', '-9', '9', '10', '-2'];
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.have.ordered.members(['-1', '-2', '-3', '-4', '-7', '-9', '0', '10', '7', '9', 'abcd', 'efg']);
    });

    it("call sorter on array of numbers as a string with localestring comparator", () => {
        let list = ['-4', '0', '-3', '-7', '7', '-1', '-9', '9', '10', '-2'];
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.have.ordered.members(['-1', '-2', '-3', '-4', '-7', '-9', '0', '10', '7', '9']);
    });
    it("call sorter on array of numbers as a string with ascii order", () => {
        let list = ['-4', '0', '-3', '-7', '7', '-1', '-9', '9', '10', '-2'];
        sorter.sort(list, (s1: string, s2: string) => s1 > s2 ? 1 : (s1 < s2 ? -1 : 0));
        expect(list).to.have.ordered.members(['-1', '-2', '-3', '-4', '-7', '-9', '0', '10', '7', '9']);
    });

    it("call sorter on array of float numbers", () => {
        let list = [1.4, 1.6, 1.2, 1.8, 1.3, 1.1];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([1.1, 1.2, 1.3, 1.4, 1.6, 1.8]);
    });

    it("call sorter on array of negative float numbers", () => {
        let list = [-1.4, -1.6, -1.2, -1.8, -1.3, -1.1];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([-1.8, -1.6, -1.4, -1.3, -1.2, -1.1]);
    });

    it("call sorter on array of strings with localestring comparator", () => {
        let list = ['f', 'a', 'z', 'q', 't', 'r', 'z', 'x'];
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.have.ordered.members(['a', 'f', 'q', 'r', 't', 'x', 'z', 'z']);
    });
    it("call sorter on array of uppercase strings with localestring comparator", () => {
        let list = ['F', 'A', 'X', 'T', 'Q', 'S', 'Z', 'X'];
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.have.ordered.members(['A', 'F', 'Q', 'S', 'T', 'X', 'X', 'Z']);
    });
    it("call sorter on array of uppercase and lowercase strings in alphabetic order", () => {
        let list = ['a', 'A', 'X', 'T', 'q', 'S', 'Z', 'x', 'C', 'D', 'd', 'c'];
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.have.ordered.members(['a', 'A', 'c', 'C', 'd', 'D', 'q', 'S', 'T', 'x', 'X', 'Z']);
    });
    it("call sorter on array of uppercase and lowercase strings in ASCII value order", () => {
        let list = ['a', 'A', 'X', 'T', 'q', 'S', 'Z', 'x', 'C', 'D', 'd', 'c'];
        sorter.sort(list, (s1: string, s2: string) => s1 > s2 ? 1 : (s1 < s2 ? -1 : 0));
        expect(list).to.have.ordered.members(['A', 'C', 'D', 'S', 'T', 'X', 'Z', 'a', 'c', 'd', 'q', 'x']);
    });
    it("call sorter on array of strings", () => {
        let list = ['f', 'a', 'z', 'q', 't', 'r', 'z', 'x'];
        sorter.sort(list, (s1: string, s2: string) => s1 > s2 ? 1 : (s1 < s2 ? -1 : 0));
        expect(list).to.have.ordered.members(['a', 'f', 'q', 'r', 't', 'x', 'z', 'z']);
    });
    it("call sorter on array of uppercase strings", () => {
        let list = ['F', 'A', 'X', 'T', 'Q', 'S', 'Z', 'X'];
        sorter.sort(list, (s1: string, s2: string) => s1 > s2 ? 1 : (s1 < s2 ? -1 : 0));
        expect(list).to.have.ordered.members(['A', 'F', 'Q', 'S', 'T', 'X', 'X', 'Z']);
    });

    it("call sorter on array of strings to check if same object is sorted", () => {
        let list = ['f', 'a', 'z', 'q', 't', 'r', 'z', 'x'];
        let temp = list;
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.equals(temp);
    });
    it("call sorter on array of numbers to check if same object is sorted", () => {
        let list = [5, 5, 3, 3, 10, 10, 1, 1];
        let temp = list;
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.equals(temp);
    });
    it("call sorter on array of words", () => {
        let list = ['fsdf', 'abcd', 'trw', 'bvcb', 'swerdf', 'pqrs', 'xyz', 'tuv'];
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.have.ordered.members(['abcd', 'bvcb', 'fsdf', 'pqrs', 'swerdf', 'trw', 'tuv', 'xyz']);
    });
    it("call sorter on array with empty strings", () => {
        let list = ['', 'abcd', 'trw', '', 'swerdf', 'pqrs', 'xyz', 'tuv'];
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.have.ordered.members(['', '', 'abcd', 'pqrs', 'swerdf', 'trw', 'tuv', 'xyz']);
    });
    it("call sorter on array with space", () => {
        let list = [' ', 'abcd', 'trw', ' ', 'swerdf', 'pqrs', 'xyz', 'tuv'];
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.have.ordered.members([' ', ' ', 'abcd', 'pqrs', 'swerdf', 'trw', 'tuv', 'xyz']);
    });

    it("call sorter on array with true and false", () => {
        let list = [true, false, true, true, false];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([false, false, true, true, true]);
    });

    it("call sorter on empty array", () => {
        let list = [];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([]);
    });

    it("call sorter on array with 1 number", () => {
        let list = [10];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([10]);
    });

    it("call sorter on array with all equal", () => {
        let list = [5, 5, 5, 5, 5, 5, 5];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([5, 5, 5, 5, 5, 5, 5]);
    });

    it("call sorter on array with different numbers", () => {
        let list = [Number.EPSILON, Number.MAX_VALUE, Number.MIN_VALUE, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
        sorter.sort(list, (s1: number, s2: number) => s1 - s2);
        expect(list).to.have.ordered.members([Number.NEGATIVE_INFINITY, Number.MIN_SAFE_INTEGER, Number.MIN_VALUE, Number.EPSILON, Number.MAX_SAFE_INTEGER, Number.MAX_VALUE, Number.POSITIVE_INFINITY]);
    });

    it("call sorter on empty array with locale compare", () => {
        let list = [];
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.have.ordered.members([]);
    });

    it("call sorter on empty array with special characters", () => {
        let list = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '>'];
        sorter.sort(list, (s1: string, s2: string) => s1.localeCompare(s2));
        expect(list).to.have.ordered.members(['!', '(', ')', '@', '*', '&', '#', '%', '^', '>', '$']);
    });
    it("call sorter on array of objects and sort by price", () => {
        let list = [bread, pen, coffee, pizza, ramen];
        sorter.sort(list, (s1: product, s2: product) => s1.price - s2.price);
        expect(list).to.have.ordered.members([pizza, coffee, bread, ramen, pen]);
    });
    it("call sorter on array of objects and sort by name", () => {
        let list = [bread, pen, coffee, pizza, ramen];
        sorter.sort(list, (s1: product, s2: product) => s1.name.localeCompare(s2.name));
        expect(list).to.have.ordered.members([bread, coffee, pen, pizza, ramen]);
    });
})
