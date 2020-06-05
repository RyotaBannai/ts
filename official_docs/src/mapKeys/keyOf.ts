function getProp(obj: {}, key: string) {
    return obj[key];
}

const my_data = {
    age: 15,
    name: 'Chiya',
}

const a = getProp(my_data, 'age')
console.log(a)