import { IComparable } from "./icomparable";

export class Sort {

    public static quickSort<T>(arr: Array<T>, left: number, right: number, compare: (a: T, b: T) => boolean) {
        let pivot: number
        let partitionIndex: number

        if (left < right) {
            pivot = right;
            partitionIndex = this.partition(arr, pivot, left, right, compare);

            //sort left and right
            this.quickSort(arr, left, partitionIndex - 1, compare);
            this.quickSort(arr, partitionIndex + 1, right, compare);
        }
        return arr;
    }

    private static partition<T>(arr: Array<T>, pivot: number, left: number, right: number, compare: (a: T, b: T) => boolean) {

        let partitionIndex = left;
        for (var i = left; i < right; i++) {
            if (compare(arr[i], arr[pivot])) {
                this.swap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }
        this.swap(arr, right, partitionIndex);
        return partitionIndex;
    }

    private static swap<T>(arr: Array<T>, i: number, j: number) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

}