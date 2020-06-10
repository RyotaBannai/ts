/*
* https://qiita.com/hosomichi/items/e11ad0c4ea79db2dee84
* call関数は関数を実行するのに対し、
* bind関数は新たな関数を生成して返す
* */

/*
* bind
* */

function Man(name){
    this.name = name;
    this.greet = function(){
        console.log(`hello, my name is ${this.name}`);
    }
}

function Cat(name){
    this.name = name;
}

let steve = new Man('Steve');
steve.greet();

let tama = new Cat('Tama');
let tamaGreet = steve.greet.bind(tama); // this を強制変更
tamaGreet();


// この場合でもy（あとの引数）に先に代入できるわけではない
function add(x, y) {
    return x + y*2;
}
// 関数を部分適用
var add200 = add.bind(null, 2);
console.log(add200(3));

/*
* apply call
* */

let Girl = function() {
    this.name = 'a girl';
    this.enterToilet = function(){
        console.log(this.name + " is using a female bathroom.");
    };
};
let Boy = function() {
    this.name = 'a boy';
};

new Girl().enterToilet();
new Girl().enterToilet.call(new Boy());