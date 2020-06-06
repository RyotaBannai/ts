interface Dictionary<T> {
    [key: string]: T;
}
let keys: keyof Dictionary<number>; // string | number
let value: Dictionary<number>['foo']; // number


interface Dictionary2<T> {
    [key: number]: T;
}
let keys2: keyof Dictionary2<number>; // string | number
// let value2: Dictionary2<number>['foo']; // this is an error. If you have a type with a number index signature, keyof T will just be number.