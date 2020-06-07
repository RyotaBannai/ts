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
## 型推論
- `+`のオペランドに`any型`が来ている場合は、もう一方が`string型`であることが判明している場合は`+`の結果が`string`となり、そうでない場合は`+`の結果も`any`となります。
