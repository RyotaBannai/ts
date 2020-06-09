interface ObjectConstructor {
    create(o: object | null): any;
    setPrototypeOf(o: any, proto: object | null): any;
}

const o = {};
Object.create(o); // OK
Object.create(null); // OK
// Object.create(1111); // Error

