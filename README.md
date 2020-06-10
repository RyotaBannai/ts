### tsconf
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html

### Important to know.
-  `Type assertions (キャスト)` Type assertions を使うと、実際のデータがどうであろうが強制的に型情報を書き換えてしまえるので、有り難い Typescript の型チェックをすり抜けてしまう
- `自動推論`：コンパイラは、`特定の項目を読み込み専用に自動的に推論することができる`。例えば、クラス内で `getter` しか持たず `setter` を持たないプロパティは、読み取り専用とみなされる。
- `const` vs `readonly`
    - const: 
        1. 変数参照に使う
        2. 他の値を再度割り当てることはできない
    - readonly: 
        1. プロパティに利用
        2. エイリアシングによりプロパティが変更できてしまう（次のsnippetを参考）
```typescript
// エイリアシングによるreadonlyプロパティの変更
let o: {
    readonly p: number;
} = {
    p : 123
};

function iMutateO(arg: {myP: number}) {
  arg.myP = 456 // 456!
}
```
- `Type`は既存`Interface`（他の関数・クラスなどでも良い）を`manipulateするもの`。つまりプロパティをreadonlyにしたり、オプショナルにしたり。
- keyof, extends keyof, in keyof(`mapped type`) などについて [参考](https://blog.yux3.net/entry/2017/02/08/033834)
- index signature: T\[K\] の K
- `proxy wrapping another type` [参考](https://stackoverflow.com/questions/49364282/how-to-convert-interface-to-mapped-type-in-typescript)
- keyof: That’s because this kind of transformation is `homomorphic`, which means that `the mapping applies only to properties of T and no others`
- `conditional types`: conditional types adds the ability to express `non-uniform type mappings`
- if you need to add types for library.
```bash
npm install --save-dev @types/lodash
npm install --save lodash
```
### Conditional types
- `type MyCondition<T, U, X, Y> = T extends U ? X : Y;` ->「 `T が U に`代入可能であれば X を、そうでなければ Y 」
- `Distributive conditional types`: For example, an instantiation of `T extends U ? X : Y` with the type argument `A | B | C for T` is resolved `as (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`. `T` refers to the individual constituents _after_ `the conditional type is distributed over the union type` Furthermore, references to T within X have an additional type parameter constraint U (i.e. `T is considered assignable to U within X`).
- conditional types are not permitted to reference themselves recursively.
```typescript
type ElementType<T> = T extends any[] ? ElementType<T[number]> : T;  // Error
```
- `Type inference in conditional types` : `Within the extends clause of a conditional type`, it is now possible to have `infer declarations` that introduce a type variable to be inferred. Such inferred type variables `may be referenced in the true branch of the conditional type`. It is possible to have `multiple infer locations for the same type variable`.
- co またはcontra はコードの性質から判断。
- multiple candidates for the same type variable in `co-variant` positions causes a union type to be inferred:
```typescript
type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
type T10 = Foo<{ a: string, b: string }>;  // string
type T11 = Foo<{ a: string, b: number }>;  // string | number
```
- Likewise, multiple candidates for the same type variable in `contra-variant` positions causes an intersection type to be inferred:
```typescript
type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
type T20 = Bar<{ a: (x: string) => void, b: (x: string) => void }>;  // string
type T21 = Bar<{ a: (x: string) => void, b: (x: number) => void }>;  // string & number
```
- [Predefined conditional types to lib.d.ts from ts 2.8](https://www.typescriptlang.org/docs/handbook/advanced-types.html#predefined-conditional-types)
```typescript
Exclude<T, U> – Exclude from T those types that are assignable to U.
Extract<T, U> – Extract from T those types that are assignable to U.
NonNullable<T> – Exclude null and undefined from T.
ReturnType<T> – Obtain the return type of a function type.
InstanceType<T> – Obtain the instance type of a constructor function type.
```
### export and import 
- When exporting a module using export =, TypeScript-specific import module = require("module") must be used to import the module.
- Some libraries are designed to be used in many module loaders, or with no module loading (global variables). These are known as UMD modules. These libraries can be accessed through either an import or a global variable -> It can also be used as a global variable, but only inside of a `script`. (A script is `a file with no imports or exports`.)
### Decrator
- `Decorators` provide a way to add both `annotations` and a `meta-programming syntax` for `class declarations and members`.
- A Decorator is a special kind of declaration that `can be attached to a class declaration, method, accessor, property, or parameter`. 
- Decorators use the form `@expression`, where `expression must evaluate to a function` that will be called at runtime with information about the decorated declaration. (the same as Python's decorator) For example, given the decorator @sealed we might write the sealed function as follows:
```typescript
function sealed(target) {
    // do something with 'target' ...
}
```
- `Multiple decorators on a single declaration` in TypeScript:
    1. The expressions for each decorator are `evaluated` `top-to-bottom`.
    2. The results are then `called` as functions from `bottom-to-top`.
#### Decorator Factories
- A Decorator Factory is simply `a function` that `returns the expression that will be called by the decorator at runtime`.
### Mixin
- Mixin is interface that you don't need to implement defined members but child class can just have parent class's members to use instead.
```typescript
// Disposable Mixin
class Disposable {
    isDisposed: boolean;
    dispose() { this.isDisposed = true; }
}
// Activatable Mixin
class Activatable {
    isActive: boolean;
    activate() { this.isActive = true;
    }
    deactivate() { this.isActive = false;}
}

class SmartObject {
    constructor() { setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);}
    interact() { this.activate(); }
}

interface SmartObject extends Disposable, Activatable {}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}
```
## 型推論
- `+`のオペランドに`any型`が来ている場合は、もう一方が`string型`であることが判明している場合は`+`の結果が`string`となり、そうでない場合は`+`の結果も`any`となります。

### Do's and Don'ts
- The following types are considered to be primitive types in JavaScript:
    - string
    - boolean
    - number
    - bigint
    - symbol
    - null
    - undefined
- and `all other types are considered to be non-primitive types`.
#### Return Types of Callbacks
- Don’t use the return type `any` for callbacks whose value will be ignored. If you don't know what type to return, then use `unknown`.
- if you wonder whether parameter are required or not, then put `an optional parameter` with `?` callback, don't. there’s no need to make the parameter optional to accomplish this — `it’s always legal to provide a callback that accepts fewer arguments`.
#### Order
- Don’t put more general overloads before more specific overloads. - `TypeScript chooses the first matching overload when resolving function calls.` When an earlier overload is “more general” than a later one, the later one is effectively hidden and cannot be called.
```typescript
/* OK */
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)
```