import { clog } from "./library/generic";

function merge<T, R>(ob1: T, ob2: R): T & R {
  //交差型 与えられた型を統合した型 = 双方の型で提供される全ての機能を備えた型
  let result = <T & R>{};
  // もしメンバーが重複した場合はアタのオブジェクトを優先
  for (let key in ob1) {
    // (<any> whatever) this is a cast: Type Asserrion
    // (whatever as any) this is a cast
    (<any>result)[key] = ob1[key];

    // (this as any) allows you to gradually opt-in an opt-out of type-checking during compilation.
    // (this as any).myProperty where this can be window object or any other third party librry with no type definitions.
  }
  for (let key in ob2) {
    (<any>result)[key] = ob2[key];
  }
  return result;
}

class Book {
  constructor(private _title: string, private _price: number) {}
  toString() {
    return this._title + " " + this._price;
  }
}

class Logger {
  debug() {
    clog(this.toString());
  }
}
// Book オブジェクトと Loggerオブジェクトをマージ
let m = merge(new Book("JS 本格入門", 2020), new Logger());
console.log(m);
console.log(new Book("JS 本格入門", 2020));
