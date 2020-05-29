import {clog} from "./library/generic"

// 引数を省略可能にしたい場合.
function showTime(time?: Date): string{
  // 引数を任意にした場合は、undefined　checkを必ず入れる.
  if(time === undefined){
    let now = new Date()
    return now.toLocaleString();
  }else{
    return time.toLocaleString()
  }
}
var showTime2 = function(time: Date = new Date()): string {
  return time.toLocaleString()
}
function required_var_comes_first(name: string, year?: number) : boolean{
  return true
}

clog(showTime2())