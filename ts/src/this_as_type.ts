import { clog } from "./library/generic";

// methodでthisを返すことでメソッドチェーンを実現できる.
// Polymorphic this types と言う.
class Person {
  constructor(private _age: number) {}
  get age(): number {
    return this._age;
  }
  add(age: number): this {
    this._age += age;
    return this;
  }
  minus(age: number): this {
    this._age -= age;
    return this;
  }
}
let human = new Person(10);
clog(human.add(10).minus(5).age);
