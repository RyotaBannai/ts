import * as $ from "jquery";
import * as _ from "lodash";

let data: string = "hoge";
data = "foo";

let data2 = 100;
data2 = 150;

let imany; // 初期値を省略.
imany = 100;
imany = "not error dude!!";

let data3 = undefined; // any type
let data4 = null; // any type

// TS 2.1 以降は　noImplicitAny Optionで
// 初めて代入された型がその方になる.

let mail: string = "admin@gmail.com;";
let msg = `we are now hiring engineer. 
if you're interested in, contact us via email: 
${mail}. we're all looking forward hearing from Yo!`;

function show(result: string) {
  return `the result is ${result}.`;
}
function clog(input: any) {
  console.log(input);
}
//show(100); // error when compile to js
clog(show(<any>100)); // string cast
clog(show("100" as any)); // string cast

let array_data: string[] = ["java", "python", "go"];
let myarray: Array<string> = ["this ", "is ", "my", "fav"];
let multi_array: Array<Array<number>> = [
  //この書き方クソヤナ
  [1, 2],
  [3, 4]
];
let multi_array2: number[][] = [
  //こっちの方がまだマシ.
  [1, 2],
  [3, 4]
];
clog(myarray[0]);
clog(multi_array2[0]);

let omg1: number[] = new Array(5); //size of 5
let omg2: number[] = new Array(1, 2, 3); //size of 3
// let omg3: number[] = new Array(-5); // thus this is fucking error. but why the hell compiling doesn't catch? lol
let ohyah: number[] = [];

let obj: { [index: string]: string } = {
  // インデックスシグネチャ：　何を定義しても構わない。例えば [key: string] とかでも可能.
  hoge: "oh",
  huga: "yah",
  bar: "mmm. yas"
};
clog(obj.hoge);

interface StringMap {
  [key: string]: string;
}

let obj2: StringMap = {
  ohh: "yah",
  man: "dude"
};
clog(obj2.ohh);

let obj3 = {
  one: 1,
  two: 2
};
// obj3.three = 3; // 後から宣言していない変数へアクセスしようとするとエラー
// プロパティ構文・ブラケット構文で要素にアクセスできる

let obj4: { [key: string]: number } = {
  one: 1,
  two: 2
};
obj4.three = 3;
// インデックスシグネチャで宣言してあげれば、後から新しい変数へアクセスできる

enum Sex { //列挙型
  MALE,
  FEMALE,
  UNKNOWN
}
let m: Sex = Sex.MALE; //型をEnumにする
clog(m); // インデックスを取得（列挙子にはデフォルトで数値が割り振られる）
clog(Sex[m]); // Value（列挙子）を取得

enum Sex2 { //任意の数値を与えることもできる
  MALE = 1,
  FEMALE = 2,
  UNKNOWN = 4
}

// Tuple: 複数の異なる型の集合を表現するためのデータ型
let diff_types_of_data: [string, number, boolean] = ["Ryota", 26, true];
if (diff_types_of_data[2]) {
  clog(diff_types_of_data[0]);
}

// Union 共用型
let union: string | boolean;
union = "hahah";
// union = 123; // here is an error
union = false;

let union_array: (string | boolean)[] = [
  "whatever you want",
  true,
  "yea haa",
  false
];

// 型エイリアス type alias for union or tuple
type WhateverType = [string, number, boolean];
let whatever: WhateverType = ["aaa", 100, false];
type WhateverType2 = string | number | boolean;
let array_whatever: WhateverType2[] = ["aaa", "aaa", "aaa"];

// 文字列リテラル型
type Season = "spring" | "summer" | "autumn" | "winter";
function getScene(s: Season) {
  clog(s);
}
getScene("spring");

// getScene("sprin"); // error

// jquery を使ってみる
// $(function() {
//   $(".class").css("background-color", "Red");
// });

clog(_.toUpper("hello world!"));
// you can use npm modules.
