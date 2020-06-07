let s = Symbol(); // Symbol()
let s2 = Symbol("key"); // Symbol(key)
let s3 = Symbol("key");
// s2 !== s3 // false, symbols are immutable, unique

let obj = {
    [s2]: "value"
}; // { [Symbol(key)]: 'valaue' }

// Symbols can also be combined with computed property declarations to declare object properties and class members.
let getClassNameSymbol = Symbol();
class C {
    [getClassNameSymbol](){
        return "C";
    }
}
let c = new C();
let className = c[getClassNameSymbol](); // "C"
console.info();

// Well-known Symbols
// -> In addition to user-defined symbols, there are well-known built-in symbols.
//    Built-in symbols are used to represent internal language behaviors.
