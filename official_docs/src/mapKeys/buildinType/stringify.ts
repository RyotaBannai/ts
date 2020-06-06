interface dataType {
    age: number,
    name: string,
    is_married: boolean,
}

/**
 * Turn all properties of T into strings
 */
type _Stringify<T> = {
    [P in keyof T]: string;
}

type strDataType = _Stringify<dataType> // force to use string for value

let my_data: strDataType = {
    age: 'fifteen',
    name: '007',
    is_married: 'no'
};

console.log(my_data);

export {};