import { clog } from "./library/generic";

// <...> 「要素型」と言う.
let data: Array<number> = [1, 2, 3];
// 普通はこう書く
let data2: number[][] = [
  [1, 2, 3],
  [1, 2, 3]
];
clog(data2);

// ジェネリックの対応したクラスを自分で定義することもできる.
// 任意の型を定義できるクラス...

class ItsUpToU<Type> {
  value: Type;
  getValue(): Type {
    return this.value;
  }
}

// ジェネリック型をインスタンス化するには<...>で型を指定
let g = new ItsUpToU<string>();
g.value = "new value";
clog(g.getValue());

// 複数のタイプを持たせる
class MultiGTypes<T, E> {
  value: T;
  value2: E;
  getValue(): T {
    return this.value;
  }
}

class NonGenericClass {
  static genericMethod<T>(data: T[], ...values: T[]): T[] {
    return data.concat(values);
  }
}
let x = 10;
let y = [10, 20, 30];
let z = [
  [35, 50],
  [60, 75]
];
clog(NonGenericClass.genericMethod<number>(y, x));
// clog(NonGenericClass.genericMethod(x, ...y));

function recrusiveUnzip(data: any): any {
  if (typeof data == "object") {
    data.forEach(element => {
      recrusiveUnzip(element);
    });
  } else {
    if (typeof data != "number") {
      clog("Number is an expected type.");
      return false;
    } else {
      return data;
    }
  }
}
let a: number[] = [];
a.push(recrusiveUnzip(y));
clog(a); // undefined // recursiveにした時のreturnは入ってこない.
