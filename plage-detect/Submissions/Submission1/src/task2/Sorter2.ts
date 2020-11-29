import ISorter from "../ISorter";

/**
 * Place your second Task 2 implementation of an efficient sorter (e.g. Merge sort, heap sort, quicksort, shell sort) here.
 */
export default class Sorter2<E> implements ISorter<E> {

    private compareFun: (e1: E, e2: E) => number;

    public sort(list: E[], compareFun: (e1: E, e2: E) => number): void {
        let size = list.length;
        this.compareFun = compareFun;
        this.heapSort(list, size);
    }

    /**
     * Function to perform heap sort on a list.
     */
    private heapSort(list: E[], size: number): void {
        this.heapify(list, size);

        let end: number = size - 1;
        while (end > 0) {
            this.swap(list, 0, end);
            end = end - 1;
            this.siftDown(list, 0, end);
        }
    }

    /**
     * Function to build the heap from a list.
     */
    private heapify(list: E[], size: number): void {
        let start: number = this.getParent(size - 1);
        while (start >= 0) {
            this.siftDown(list, start, size - 1);
            start = start - 1;
        }
    }

    /**
     * Function to sift down the new first element to its appropriate index.
     */
    private siftDown(list: E[], start: number, end: number): void {
        let rootNode: number = start;

        while (this.getLeftChild(rootNode) <= end) {
            let childNode: number = this.getLeftChild(rootNode);
            let nodeToSwap: number = rootNode;

            if (this.compareFun(list[nodeToSwap], list[childNode]) < 0) {
                nodeToSwap = childNode;
            }
            if (childNode + 1 <= end && this.compareFun(list[nodeToSwap], list[childNode + 1]) < 0) {
                nodeToSwap = childNode + 1;
            }
            if (nodeToSwap === rootNode) {
                return;
            }
            else {
                this.swap(list, nodeToSwap, rootNode);
                rootNode = nodeToSwap;
            }
        }
    }

    /**
     * Helper function that returns the index of the parent node of a node given its index.
     */
    private getParent(index: number): number {
        const parent: number = Math.floor((index - 1) / 2);
        return parent;
    }

    /**
     * Helper function that returns the index of the left child of the node given its index.
     */
    private getLeftChild(index: number): number {
        const child: number = 2 * index + 1;
        return child;
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
