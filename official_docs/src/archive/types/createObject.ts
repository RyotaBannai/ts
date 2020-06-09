function Person (name: string, age: number): void {
    this.name = name;
    this.age = age;
}

Person.prototype = {
  getName: function(){
      return this.name;
  },
  setName: function(new_name){
      this.name = new_name;
  }
};

const p = new Person('Jack', 11);
console.info(p.getName());


const justObject = {
    isHuman: false,
    printIntroduction: function() {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
};

const robot = Object.create(justObject);
robot.isHuman = false;
robot.name = 'Matthew';
robot.printIntroduction();

justObject.printIntroduction(); // no side effect!

export {}
