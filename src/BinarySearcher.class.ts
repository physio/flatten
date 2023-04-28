export class BinarySearcherClass {
  public static searchBy(property: string, key: any, arr: Object[]) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      let middle = Math.floor((start + end) / 2);

      if (arr[middle][property] === key) {
        return middle;
      } else if (arr[middle][property] < key) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }
    return -1;
  }
}
