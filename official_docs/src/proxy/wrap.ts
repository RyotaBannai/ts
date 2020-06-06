type Proxy<T> = {
    get(): T;
    set(value: T): void;
}

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}

function proxify<T>(o: T): Proxify<T> {
    let result = {} as Proxify<T>;
    for(let key of Object.keys(o)) {
        result[key] = {
            get: () => o[key],
            set: (val) => o[key] = val,
            unset: (val) => o[key] = undefined, // これは Proxify の返り値は Proxyのため宣言できても使えない
        };
    }

    return result;
}

interface User {
    name: string
}

let props: User = {
    name: 'ryota', // type Proxify の [P in keyof T] の部分に相当
};

let proxyProps: Proxify<User> = proxify<User>(props); // interfaceの部分はあると尚堅牢

console.log(proxyProps.name.get());

proxyProps.name.set('ryotabannai');
// proxyProps.name.unset(); // this is an error
console.log(proxyProps.name.get());

export {
    proxyProps,
    Proxify,
    User,
}
