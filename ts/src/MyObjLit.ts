import { clog } from "./library/generic";

// オブジェクト型リテラル
// その場限りでの型で、インターフェイスを定義するまでもないが、
// 型情報だけは明示しておきたい時に使う.
let wagon: { type: string; weight: number } = {
  type: "light-weighted",
  weight: 750
};

interface Car {
  type: string;
  weight: number;
}
// 注釈としてのインターフェイス
let truck: Car = {
  type: "heavy-weighted",
  weight: 1250
};

class MyClass {
  FirstMethod() {
    clog(
      "I was born in MyClass class, not when aissgned in variable x... oh hi!!"
    );
  }
  SecondMethod() {}
}
// オブジェクトリテラル最強！！！
let x: { FirstMethod() } = new MyClass();
x.FirstMethod();
// x.SecondMethod(); エラー
