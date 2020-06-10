function CellPhone(_number){
    this.phone_number = _number;
    this.clock = () => console.log(`Current time is ${new Date().toLocaleString()}`);
}
CellPhone.prototype = {
  ring: function() {
      console.log('you got a message!')
  }
};

function SmartPhone(number, wifispots){
    let _key;
    this.wifispots = wifispots;
    CellPhone.call(this, number); // call let you inherit all members from other object!! notice this passes required members as well.
    Object.defineProperty(this,"key",{
        get: function() { return _key; },
        set: function(value) { _key = value; },
        //value: 42, // you can set a default value
        //writable: false
    });
}
SmartPhone.prototype = new CellPhone('000-000-0000'); // instanceof 用
const smartphone = {
    some_random_value: 'random',
    item: function() {},
};

let sm = new SmartPhone('111-111-1111', ['Home', 'Starbucks']);
Object.setPrototypeOf(sm, smartphone);


console.log((sm instanceof CellPhone)); // true
sm.clock();
console.log(sm.phone_number); // oh no... this is 111-111-1111 because of overwriting the same arguments when construct.
console.log(sm.some_random_value);
console.log(sm.some_random_value);
sm.key = 'some random key';
console.log(sm.key);