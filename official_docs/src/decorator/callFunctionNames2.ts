function f() {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
        console.log(target); // C { method: [Function] } => decorated function
        console.log(propertyKey); // method
        console.log(descriptor);
        /*
        *
        * {
        *   value: [Function],
        *   writable: true,
        *   enumerable: true,
        *   configurable: true
        * }
        *
        * */
    }
}

function g() {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
        console.log(target); // C { method: [Function] } => decorated function
        console.log(propertyKey); // method
        console.log(descriptor); // refer function f() fourth console.log output comments
    }
}

class C {
    @f()
    @g()
    method() {}
}

const c = new C();
c.method();