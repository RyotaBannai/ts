function getProp<T, K extends keyof T>(obj: T, key: K){
    return obj[key]
}

interface dataType {
    age: number,
    name: string,
}

const my_data: dataType = {
    age: 15,
    name: 'China',
};

const a = getProp(my_data, 'age');
console.log(a);

export {};