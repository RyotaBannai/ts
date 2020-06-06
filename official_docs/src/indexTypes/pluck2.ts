interface dataType {
    age: number,
    name: string,
}

interface Car {
    manufacturer: string;
    model: string;
    year: number;
}
let taxi: Car = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014
};

function pluck<T, K extends keyof T>(o:T, keyNames:K[]): T[K][]
// And you can use keyof in generic contexts, where you can’t possibly know the property names ahead of time
{
    return keyNames.map(key => o[key])
}

let specs: string[] = pluck(taxi, ['manufacturer']); // 1. key check 2. assigned value's type check
console.log(specs);

export {};