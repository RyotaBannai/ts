interface dataType {
    age: number,
    name: string,
}

let my_data: dataType = {
    age: 15,
    name: '007',
};

function pluck(o, keyNames:[string]) {
    return keyNames.map(key => o[key])
}

console.log(pluck(my_data, ['age']));

export {};