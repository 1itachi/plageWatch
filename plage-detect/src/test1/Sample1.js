function binarySearch(myArray, value){
    let left = 0;
    let right = myArray.length - 1;
    let middle = parseInt((myArray.length - 1)/2)
    while (left <= right) {
        if (myArray[middle] === value) {
            return middle;
        } else if (myArray[middle] < value) {
            left = middle + 1;
            middle = parseInt((left + right)/2);
        } else if (myArray[middle] > value) {
            right = middle - 1;
            middle = parseInt((left + right)/2);
        }
    }
    return -1;
}
console.log(binarySearch([1,2,3,4,5,6,7,16],51))