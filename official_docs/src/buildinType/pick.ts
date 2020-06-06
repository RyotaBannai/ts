interface dataType {
    age: number,
    name: string,
}
type _Pick<T, K extends keyof T> = {
    [P in K]: T[P]; // K じゃなくて P。 P がT のK にあるかどうか確認したい。
}

type MyReadonly = _Pick<dataType, 'age'>; // Partial makes variable optional;
// type MyReadonly = Pick<dataType, 'age'>;a

let my_data: MyReadonly = {
    age: 15,
    // name: 'China',  // picked only 'age' property
};

console.log(my_data)

export {};