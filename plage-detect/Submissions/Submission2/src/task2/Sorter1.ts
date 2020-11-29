import ISorter from "../ISorter";

/**
 * Place your first Task 2 implementation of an efficient sorter (e.g. Merge sort, heap sort, quicksort, shell sort) here.
 */
export default class Sorter1<E> implements ISorter<E> {

    private compareFun: (e1: E, e2: E) => number;

    public sort(list: E[], compareFun: (e1: E, e2: E) => number): void {
        let length = list.length - 1;
        this.compareFun = compareFun;
        this.quickSort(list, 0, length);
    }

    /**
     * Function that performs quicksort on a list.
     */
    private quickSort(list: E[], start: number, end: number): void {
        if (start < end) {
            const partition: number = this.partition(list, start, end);
            this.quickSort(list, start, partition);
            this.quickSort(list, partition + 1, end);
        }
    }

    /**
     * Function that partition the list such that every element less that pivot appears before the pivot and every element greater than the pivot appears after the pivot.
     */
    private partition(list: E[], start: number, end: number): number {
        let pivot: E = list[Math.floor((end + start) / 2)];
        let i: number = start - 1;
        let j: number = end + 1;
        while (true) {
            do {
                i++;
            } while (this.compareFun(list[i], pivot) < 0);
            do {
                j--;
            } while (this.compareFun(list[j], pivot) > 0);
            if (i >= j) {
                return j;
            }
            this.swap(list, i, j);
        }
    }

    /**
     * Helper function to swap 2 elements in a list.
     */
    private swap(list: E[], position1: number, position2: number): void {
        let temperory = list[position1];
        list[position1] = list[position2];
        list[position2] = temperory;
    }
}
