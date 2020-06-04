import { clog } from "./library/generic";

// abstract継承ではなくinterfaceを使う.
// 複数のinterfaceを実装できる

interface Figure {
  // メソッドは全て抽象メソッド
  // アクセス修飾子は指定できない -> 全てのメンバーはpublicであることが明らかであるため
  getArea(): number;
}

interface Sound {
  letitcry(): string;
}

class Triangle implements Figure, Sound {
  // 実装クラス
  constructor(private _width: number, private _height: number) {}
  getArea(): number {
    return (this._width * this._height) / 2;
  }
  letitcry(): string {
    return "figure doesn't cry";
  }
}
let t = new Triangle(10, 5);
clog(t.getArea());
clog(t.letitcry());

// interfaceがクラスを継承することもできる
// この場合、実装は消えて、シグネチャのみが残る
class Person {
  eat(food: string): string {
    return `${food} is my favorite food.`;
  }
  play(tool: string): string {
    return `${tool} is my favorite thing to do in my free time.`;
  }
}

interface Todo extends Person {}

class Jobs implements Todo {
  constructor(
    private _food: string = "apple",
    private _tool: string = "ipod"
  ) {}
  eat(): string {
    return `${this._food} is my favorite food.`;
  }
  play(): string {
    return `${this._tool} is my favorite thing to do in my free time.`;
  }
}

let SJobs = new Jobs();
clog(SJobs.eat());

class Jobs2 {
  constructor(
    private _food: string = "apple",
    private _tool: string = "ipod"
  ) {}
  eat(): string {
    return `${this._food} is my favorite food.`;
  }
  play(): string {
    return `${this._tool} is my favorite thing to do in my free time.`;
  }
}
// Jobs2 は明示的にTodo interface を実装していないが
// Todo型の変数structural_subtyping にオブジェクトを代入できている.
// 構造的部分型 Structural Subtyping => 型の相互性があるかどうかを見る
let structural_subtyping: Todo = new Jobs2();

// Jobs class が例
// Java やC# のように継承・実装することのみによって、相互性を判定するアプローチは
// 公称的部分型 Nominal Subtyping


// 型注釈としてのinterface
let mytodo: Todo = {
  eat(food: string): string {
    return `${food}`;
  },
  play(tool: string): string {
    return `${tool}`;
  }
};
clog(mytodo.eat("apple"));
