/**
 * interface defining the API for iterators.
 */
interface IIterator<T> {

    hasNext(): boolean

    next(): T
}

export default IIterator;
