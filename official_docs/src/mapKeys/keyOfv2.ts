function getProp(obj: {}, key: dataKeyType) { // better than 'string' type to narrow down.
    return obj[key];
}

interface dataType { // add an interface to better type narrowing
    age: number,
    name: string,
}

const my_data: dataType = {
    age: 15,
    name: 'China',
};

type dataKeyType = 'age' | 'name'; // 'String Literal type' the type for key

const a = getProp(my_data, 'age'); // if you add other than 'age' nor 'name', you'll get an error
console.log(a)

export {};