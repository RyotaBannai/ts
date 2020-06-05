function getProp(obj: {}, key: dataKeyType) {
    return obj[key];
}

interface dataType {
    age: number,
    name: string,
}

const my_data: dataType = {
    age: 15,
    name: 'China',
};

type dataKeyType = keyof dataType; // the same as 'age' | 'name';

const a = getProp(my_data, 'age');
console.log(a);

export {};