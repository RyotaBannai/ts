type _Readonly<T> = {
    readonly [P in keyof T]: T[P]; // インデックスのシグネチャ
}

interface dataType {
    age: number,
    name: string,
}

type MyReadonly = _Readonly<dataType>;
// type MyReadonly = Readonly<dataType>; the same

let my_data: MyReadonly = {
    age: 15,
    name: 'China',
};

// my_data.age = 1; // an error cause of re-assigning value to readonly var

export {};