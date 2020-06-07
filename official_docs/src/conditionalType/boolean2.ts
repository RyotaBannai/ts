interface Foo {
    prop: boolean;
}

interface Baz {
    prop: boolean;
}

function f<T>(x: T): T extends Foo ? string : number
{
    if(x.prop) return 'true';
    else return 0;
}

function foo<U>(x: U): string| number {
    // Has type 'U extends Foo ? string : number'
    let a = f(x);

    // This assignment is allowed though!
    let b: string | number = a;

    return b;
}

const myFoo: Foo = {
    prop: true,
}
const myBaz: Foo = {
    prop: false,
}

const resultFoo = foo(myFoo);
const resultBaz = foo(myBaz);

console.log(resultFoo)
console.log(resultBaz)


