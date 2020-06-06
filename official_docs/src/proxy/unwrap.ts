import {proxyProps, Proxify, User } from './wrap'

function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) { // here, get a key of a proxified object
        result[k] = t[k].get();
    }
    return result;
}

let originalProps: User = unproxify<User>(proxyProps);

console.log(originalProps);

export {}