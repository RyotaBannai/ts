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
- `型註釈`: `const a: number = 3;`
- `リテラル型のwidening`: `constとは異なり`、`varやlet`に代入された式がリテラル型の場合はそれらはリテラル型ではない型に変換されます。例えば、123型はnumber型に、"foobar"型はstring型に変換されます。このように、リテラル型からそれに対応するプリミティブ型に変換される挙動をwideningという。varやletの場合でも変数宣言に型註釈をつけることが可能:
```typescript
// 変数 a は 123 型
let a: 123 = 123;
a = 456; // Error
```
- 「宣言後に初期化されていない変数を使おうとしたらエラーを出す」
```typescript
// number 型の変数 a を宣言だけする
let a: number;
console.log(a); // error because a is still undefined.
```
- また、aに値が代入されていない可能性があるだけでもやはりエラー -> `let a: number | undefined;` にすれば大丈夫
```typescript
// number 型の変数 a を宣言だけする
let a: number;
if (Math.random() < 0.5) a = 123;
console.log(a);
```
- union 型が発生
```typescript
let a;
if (Math.random() < 0.5) a = 123;
console.log(a); // a は number | undefined 型
```
- 関数の中で代入してるからnumber方になると思いきや、tsの型決定は関数まではみないため、typeはundefinedでvalueはstringみたいなことが起きてしまう。
```typescript
let a;

// ここでは a は undefined 型
console.log(a);
const u: undefined = a;

change_a();

// ここで a は undefined 型
const num: undefined = a;
console.log(a); // "123" が表示される

function change_a() {
    a = "123";
}
```
- 自動でstring型になるが、後からnull を代入することもできる。
```typescript
let stringOrNull: string | null = "abcde";
```
- オブジェクトリテラルの型の推論でもproperty に windeningが働く(後から中身を変更できるようするため)（配列リテラルの場合も同様）
```typescript
const obj = {
  foo: "hello", // string type instead of 'hello' type
  bar: 123,``
};
```
- windening を抑制したならば `as const` を使う
```typescript
// 変数 a の型は string ではなく "foo"
let a = "foo" as const;
// 変数 b の型は { readonly foo: "foobar" }
const b = {
  foo: "foobar"
} as const;
// 変数 c の型は readonly ["foo", 123]
const c = ["foo", 123] as const;
```
#### 論理演算子の型推論
- const の場合、再代入されることはないのでwideningは適応されない
```typescript
const num: number = 123;
// or の型は number | "foobar" 型
const or = num || "foobar";
```
- let の場合、再代入されることがあるためwideningは適応される。つまり、or の型は number | string 型になる。
- 次のような場合、numが返却されるのは num = 0 またはNaNの場合なので、　and は 0 | NaN | "footbar" 型になる。しかし ts は NaN を知らない実質的には 0 | "foobar"型になる。（https://github.com/microsoft/TypeScript/pull/9407#issuecomment-229721835）
- 
```typescript
const and = num && "foobar";
```
- `条件分岐による型の絞り込み`: `フロー解析`(「if文の中でだけ型が変わる」のような挙動)によって、エラーになる可能性（nullやundefinedにアクセス）を排除してあげれば、typeエラーを避けることができる。[参考](https://qiita.com/uhyo/items/6acb7f4ee73287d5dac0#%E6%9D%A1%E4%BB%B6%E5%88%86%E5%B2%90%E3%81%AB%E3%82%88%E3%82%8B%E5%9E%8B%E3%81%AE%E7%B5%9E%E3%82%8A%E8%BE%BC%E3%81%BF)
- `戻り値の型の推論`: 関数の戻り値の型註釈を省略した場合は戻り値の型が推論される。wideningは適用されない。
- return文が無い関数の場合は、返り値の型として`void型`が推論されます。一方、「`return文はあるけどreturnせずに関数が終了する場合がある`」という場合はreturnしない部分は`undefined型`を返すものとして推論されます。勝手にundefinedを推論するんじゃなくてエラーにしてほしいという場合は`--noImplicitReturns`を指定。
- ts は`関数の中で引数がどう使われているかは見ていない`。`関数を例えばfoo(123)というように呼び出しても、これを見て引数の型が推論されるようなことも無い。これは「変数の型は宣言時に決まる」という原則により説明できる。` 
     - この例外が:
        -　`contextual type による引数型の推論`　関数をinterfaceで実装した時に、interfaceが型を指定しているときは、実装側で型を指定しなくても推論してくれる。
        - Generic type
- 一度コールバック関数を別の変数に入れようとすると上手くいかない。
```typescript
function callWith100(callback: (arg: number) => void) {
  callback(100);
}
// ↓これは num の型を推論できないのでエラー
const func = num => {
  // ここでは num は number 型
  console.log(num * 10);
};
callWith100(func);
```
```typescript
// genertic type では引数から typeを推測
function apply<T, R>(value: T, func: (arg: T) => R): R {
  return func(value);
}
// res は string 型
const res = apply(100, num => String(num ** 2));
```
- 型推論失敗例: Uの正しい型が判明するのは第3引数の型推論を行った後なのに、それより前の段階でUが必要になったためやむなくunknown型に固定されているという点です。TypeScriptは原則としてワンパスで型推論を行うため、第3引数の推論で正しいUが判明したからといって第2引数の推論をやり直すとかそういう挙動をすることはありません。
```typescript
function apply<T, U, R>(
  value: T,
  func1: (arg: U) => R,
  func2: (arg: T) => U,
): R {
  return func1(func2(value));
}

function id<T>(value: T): T {
  return value;
}

// 意図はT = number, U = string, R = boolean だが、
// 実際の型引数の推論結果は T = number, U = unknown, R = boolean となる
// その結果、str が unknown 型扱いになり str.length でエラーが発生
const res = apply(100, str => str.length > 0, num => String(num ** 2));
```
#### オーバーロードされた関数の型推論
- このように宣言されたfuncを呼び出す側が今回のポイントです。2つの数値を引数に渡した場合はfuncの1つ目のシグネチャ（(arg1: number, arg2: number) => number）が採用されて返り値がnumber型と推論される一方で、1つの文字列を引数に渡した場合はもう1つのシグネチャ(arg1: string) => stringが採用されて返り値はstring型になります。
```typescript
function func(arg1: number, arg2: number): number;
function func(arg1: string): string;
function func(arg1: number | string, arg2?: number): number | string {
  if (typeof arg1 === "number") {
    return arg1 + arg2!;
  } else {
    return arg1;
  }
}

// res1 は number 型
const res1 = func(123, 456);
// res2 は string 型
const res2 = func("foo");
```
- 配列の型推論: 変数の型が宣言時に決まるというルールを逸脱した挙動が発生します
```typescript
const arr = [];
for (let i=0; i<10; i++) {
  arr.push(String(i));
}
// ここでは arr の型は string[] 型

arr.push(123);
// ここでは arr の型は (string | number)[] 型
```
- 配列に何も入れないまま使ってもlet で宣言した変数と同様エラー
```typescript
const arr = [];
arr[0]; // ここでエラー
const arr2 = arr.slice(); //これもエラー
```
- [参考](https://qiita.com/uhyo/items/6acb7f4ee73287d5dac0#%E6%9D%A1%E4%BB%B6%E5%88%86%E5%B2%90%E3%81%AB%E3%82%88%E3%82%8B%E5%9E%8B%E3%81%AE%E7%B5%9E%E3%82%8A%E8%BE%BC%E3%81%BF)
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