import { clog } from "./library/generic";

// property signature/ method signature, index signature, and
// call signature for function type

interface Vehicle {
  (type: string): string;
}
let plane: Vehicle = function(type) {
  return `I can ${type} baby.`;
};
clog(plane("FLY"));

// index signature
interface Character {
  [key: string]: string;
}

let obj2: Character = {
  fruit: "apple",
  tool: "ipod"
};

let jobs: { [index: string]: string } = {
  fruit: "apple",
  tool: "ipod"
};
clog(jobs.hoge);
