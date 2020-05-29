// js はool (object oriented language)
// だけどプロトタイプベースのoos (object oriented structure)
// ts はJava/ C# ライクなクラスベースのoos
// (最新のjs仕様であるecmascript2015ではclass命令をサポート. ただまだまだ貧弱なのでtsを使う.)

import {clog} from "./library/generic"

class Person{
  //property
  private name: string;
  private sex: string;
  //constructor
  constructor(name: string, sex: string){ // statements
    // can't define the type of return
    this.name = name;
    this.sex = sex;
  }
  //method
  public show(): void{ // statements
    clog(`${this.name} is ${this.sex}.`);
  }
}
let p = new Person('Mike', 'Male');
p.show()

// constructorからpropertyへのセットを簡略化
// constrcutor の引数の型に「修飾子」をつけるだけ
class Person2{
  constructor(private _name: string, private _sex: string, private _age: number){}
  public show(): void{ // statements
    clog(`${this._name} is ${this._sex}.`);
  }
  // getter (accesser)
  get name(): string {
    return this._name;
  }
  // setter (accesser)
  set name(name: string){
    if (typeof name === 'string'){
      this._name = name;
      clog('name has just changed.')
    }
    else{
      clog('please pass a string.')
    }
  }
  // private static judge(param: number)... Person2.judge でcall // 静的メソッド
  protected judge(param: number){
    if (param < 0){
      // throw new RangeError('get lost\n');
      clog('get lost.');
      return 0;
    }
  }
  // static method: クラスに直接属し、クラスが実行するメソッド
  // non static method: インスタンスに属し、インスタンスが実行
  public run = function (motivation: number): number {
    this.judge(motivation)
    
    var mile = 0
    if (this._sex === 'Male'){
      mile = 2 * (1 - (1/this._age)) * motivation;
    }else{
      mile = 1 * (1 - (1/this._age)) * motivation;
    }
    return mile;
  }
}
let p2 = new Person2('Lisa', 'Female', 30)
p2.show()
p2.name = 'Jobs'
p2.show()
clog(p2.name)

clog(p2.run(1))

// tsc -t es5 script.ts