import {clog} from "./library/generic"

class Person{ //スーパークラス、親クラス、基底クラス
  constructor(protected _name: string, protected _sex: string){}
  public show(): void{
    clog(`${this._name} is ${this._sex}`);
  } 
}
// Class Person を継承
class BusinessPerson extends Person{
  constructor(_name: string, _sex: string, protected _clazz: string){
    super(_name, _sex); // コンストラクタをオーバーライド
  }
  public show(){
    super.show();
    clog(`and ${this._clazz}`);
  }
  worksohard(): void{ //サブクラス、小クラス、派生クラス
    clog(`${this._name} is working so hard from on Monday.`);
  }
}
let p = new BusinessPerson('Bill', 'Male', 'Manager')
p.show()
p.worksohard()


// 派生メソッドでは、派生クラス先で機能を上書きしなければならない.
class Figure{
  constructor(protected width: number, protected height: number){ }
  getArea(): number{ // Figure#getArea メソッドにはほとんど意味は無い.
    return 0;
  }
}
class Triangle extends Figure{
  getArea(): number{
    return this.width * this.height / 2 ;
  }
}

let t = new Triangle(10, 5);
clog(t.getArea())

// 抽象クラス
abstract class Figure2{
  constructor(protected width: number, protected height: number){ }
  // 上のFigure#getArea メソッドにはほとんど意味は無いので、
  // 消去してしまおうと言うのが抽象メソッドの意図.
  abstract getArea(): number;
}

class Triangle2 extends Figure2{
  getArea(): number{ // 宣言しないとエラー
    return this.width * this.height / 2 ;
  }
}