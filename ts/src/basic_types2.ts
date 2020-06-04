// https://www.typescriptlang.org/docs/handbook/basic-types.html#a-note-about-let
// basics types on ts docs.
import { clog } from "./library/generic";
enum Color {
  Green, //0
  Red, //1
  Blue, //2
  Orange = 10
}
// if no number is not assigned, then default value is index.
let c: Color = Color.Orange;
let d: string = Color[1]; // valueを取り出したい場合型はstring
clog(c);
clog(d);

// void type only can be defined null or undefined.
let unusuable: void = null;
unusuable = undefined;
// and actually you can use like this.
let mynull: null = null;
let myundefined: undefined = undefined;
//**** */
// when using the --strictNullChecks flag, null and undefined
// are only assignable to any and their respective types

//object is a type that represents the non-primitive type
declare function create(o: object | null): string;
//create(12); // this is an error

//A type assertion is like a type cast in other languages
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
clog(strLength);
