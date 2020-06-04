// 他のtsファイルの読み込み
import fns = require('./functions'); // この方法でnamespaceを確保
import {test_export, test, clog} from './functions'

// 関数の主な記法
// 1. function命令
// 2. 関数リテラル
// 3. アロー関数

// python の型宣言と同じ
function triangle(base: number, height: number): number{
  return base* height/ 2;
}
fns.clog2(triangle(10,5))
test_export()
test()

// 関数リテラル 
// Python のlambda 関数
let lit_triangle = function(base: number, height: number) : number
{
  return base* height/ 2;
}

//ここまでするなら 
// アロー関数を使う
let lit_triangle2 : (base: number, height:number) => number = function(base: number, height:number): number {
  return base* height/ 2;
}
clog(lit_triangle2(1,1))

// アロー関数
let lit_triangle3 = (base: number, height:number): number => {
  return base* height/ 2;
}

// 本体が一文である場合は、中カッコは省略できる
let lit_triangle4 = (base: number, height:number): number => base * height / 2;


clog(lit_triangle3(1,1))

// アロー関数ではthis の退避が不要.
let Counter = function(){
  this.count = 0
  setInterval(() => { this.count++;}, 1000);
};
