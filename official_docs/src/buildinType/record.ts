interface dataType {
    age: number,
    name: string,
    is_married: boolean,
}

type Record< K extends string, T > = {
    [P in K]: T;
}

let my_data: dataType = {
    age: 15,
    name: '007',
    is_married: false,
};

type strDataType = Record< keyof dataType , string >

let str_my_data: strDataType = {
    age: '15',
    name: '007',
    is_married: 'false',
};


console.log(my_data); // properties are different type than number
console.log(str_my_data);
export {};