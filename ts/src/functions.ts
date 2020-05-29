// 単体でexportしたい場合
export function clog2(input) {
  console.log(input);
}

function clog(input) {
  console.log(input);
}

function test_export(){
  console.log('this is just a test.')
}
function test_fn(){
  console.log('this is a fn as different name.')
}
//まとめてexportした場合
export {
  clog,
  test_export,
  test_fn as test,
}