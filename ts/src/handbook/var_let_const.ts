import { clog } from "../library/generic";

// どの時点であれ、gが呼び出されると
// var 変数aは、関数内部に紐付けられる
function f() {
  var a = 10;
  return function g() {
    var b = a + 1;
    return b;
  };
}
clog(f()());

function omgVar(mybool: boolean) {
  if (mybool) {
    var x = 10;
  }
  return x;
}
clog(omgVar(true)); // アクセスできてしまう。letを使うとエラーになる
clog(omgVar(false));

// var で宣言された変数が関数内にある場合、関数がグローバルになる
// つまり、forの二重ループを同じ変数名で使用すると、
// ２つのループで同じ変数をインクリメントする。
