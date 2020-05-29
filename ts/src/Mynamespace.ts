import {clog} from "./library/generic"

// name space 名前空間: 同じ名前のクラスを別のパッケージで使用できるため、クラス名が競合せずに済む

// name space block

namespace MainApp{
  export class FirstClass{

  }
  export function FirstFunction(){

  }
}

//名前空間内でクラス関数を呼び出す.
let fc = new MainApp.FirstClass();
// それか、呼び出し側で requireを使って変数に代入することで同じことを実現. 例えば
// import MainApp = require('./functions'); fc = new MainApp.FirstClass();

// 階層的な名前空間 recursive name space

namespace BiggerApp.MainApp {
  export class FirstClass{
  }
}
let bfc = new BiggerApp.MainApp.FirstClass();

// もっと汎用的な方法として...
namespace BiggerApp{
  export namespace MainApp {
      export class SecondClass{
    }
  }
}