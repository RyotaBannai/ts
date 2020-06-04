import {clog} from "./library/generic"

// 可変長引数 spread operator
function sum(...values:number[]){
  let result = 0;
  for(let value of values){
    result +=value
  }
  return result
}

// ああ、こう言うの pythonista だとlistで渡したくなる
// clog(sum([1,2,3]))  => x
clog(sum(1,2,3)) // => o
clog(sum(...[1,2,3])) // それでも pythonista はlistを使う