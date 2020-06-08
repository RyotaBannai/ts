@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
    /*
    * The Object.seal() method seals an object,
    * preventing new properties from being added to it and marking all existing properties as non-configurable.
    * Values of present properties can still be changed as long as they are writable.
    * */
}

const greeter = new Greeter('Bonjour');
console.info(greeter.greet());