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
    this.wifispots = wifispots;
    CellPhone.call(this, number); // call let you inherit all members from other object!! notice this passes required members as well.
}
SmartPhone.prototype = new CellPhone('000-000-0000'); // instanceof 用



let sm = new SmartPhone('111-111-1111', ['Home', 'Starbucks']);
console.log((sm instanceof CellPhone)); // true
sm.clock();
console.log(sm.phone_number); // oh no... this is 111-111-1111 because of overwriting the same arguments when construct.