import { clog } from "../library/generic";
import * as _ from "lodash";
// for loop, forEach, for in, for of
class Program {
  constructor(private _items: any) {}
  public main(): void {
    this.forloop();
    this.myforEach();
    this.mylodash();
  }
  forloop(): void {
    for (let i = 0; i < this._items.length; i++) {
      clog(this._items[i]);
    }
    clog("--");
  }
  myforEach(): void {
    this._items.forEach(function(item) {
      clog(item + 1);
    });
    clog("--");
  }
  mylodash(): void {
    _.forEach(this._items, function(item) {
      clog(item + 2);
    });
    clog("--");
  }
  // for i in array : i is index
  // for val in array: val is value
}
let p = new Program([1, 2, 3, 4]);
p.main();
