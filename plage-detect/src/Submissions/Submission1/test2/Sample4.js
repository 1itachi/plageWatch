function BinarySearch(myArray, value){
    let l = 0;
    let r = myArray.length - 1;
    let mid = parseInt((myArray.length - 1)/2)
    while (l <= r) {
        if (myArray[mid] === value) {
            return mid;
        } else if (myArray[mid] < value) {
            l = mid + 1;
            mid = parseInt((l + r)/2);
        } else if (myArray[mid] > value) {
            r = mid - 1;
            mid = parseInt((l + r)/2);
        }
    }
    return -1;
}
console.log(BinarySearch([4,5,6,7,7,8,9],10))