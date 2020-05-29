import {clog} from "./library/generic"

// 関数のオーバーロード
// 同じ名前でありながら、引数リスト、戻り値の型が異なる関数を定義すること.

// オーバーロードでは最初にシグニチャだけの関数を準備
// シグネチャには型チェックの意味がある.
function show(value: number | boolean): void;
// 実装では全ての型を受け入れられるようにデータ型を設定
function show(value: any): any{
  if(typeof value === 'number'){    
    clog(value.toFixed(1))
  }
  else{
    clog(value? 'TRUE': 'FALSE')
  }
}
show(10.324)
show(false)

function square(value: number): number | boolean;
function square(value: any): any{
  if(value < 0){
    return false;
  }else{
    return Math.sqrt(value);
  }
}
clog(square(-1))
clog(square(1))

// 型ガード type guards
// typeof演算子で型を判定し、結果に応じて条件式で処理を分けること == 型ガード
function process(value: string | number){
  if(typeof value == 'string')
    return value.toUppperCase();
  else {
    return value.toFixed(1);
  }
}

// typeof 演算子はプリミティブ型しか判定できない
// クラス型を判定したい場合は、instanceof 演算子を使用.
