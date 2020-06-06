interface dataType {
    age: number,
    name: string,
}
type _Partial<T> = {
    [P in keyof T]?: T[P];
}

type MyReadonly = _Partial<dataType>; // Partial makes variable optional;

let my_data: MyReadonly = {
    age: 15,
    // name: 'China',  // so.. you don't have to define name cause it's optional
};

console.log(my_data)

export {};