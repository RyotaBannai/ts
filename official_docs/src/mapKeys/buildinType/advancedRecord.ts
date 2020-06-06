interface dataType {
    age: number,
    name: string,
    is_married: boolean,
}

// For every properties K of type T, transform it to U
function mapObject<K extends keyof dataType, T, U extends number> (obj: Record<K, T>): Record<K, U>
{
    let newObj = {} as Record<K, U>;

    Object.entries(obj).forEach(item => {  //  ¯\_(ツ)_/¯
        newObj[item[0] as keyof dataType] = item[1] as U
    });

    return newObj
}

type Record<K extends string, T> = {
    [P in K]: T;
}

let my_data: dataType = {
    age: 15,
    name: '007',
    is_married: false,
};

console.log(my_data); // properties are different type than number
mapObject(my_data);
export {};