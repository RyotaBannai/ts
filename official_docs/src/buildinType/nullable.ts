interface dataType {
    age: number,
    name: string,
    is_married: boolean,
}

/**
 * Make all properties in T nullable
 */
type _Nullable<T> = {
    [P in keyof T]?: T[P];
    //[P in keyof T]: T[P] | null  // これでもok
}

type strDataType = _Nullable<dataType>

let my_data: strDataType = {
    age: 15,
    name: '007',
};

console.log(my_data);

export {};