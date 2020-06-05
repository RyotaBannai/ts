function getProp(obj: {}, key: string) {
    return obj[key];
}

const my_data = {
    age: 15,
    name: 'Chiya',
}

const a = getProp(my_data, 'age') // 型推論では返り値は anyになってしまう
console.log(a)


export {}; // if your .ts file doesn’t have any sort of top-level import or export statements,
           // then you will see all these issues when global declarations are interfere with each other