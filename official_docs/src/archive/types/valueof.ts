/*
* JavaScript calls the valueOf method to convert an object to a primitive value.
* You rarely need to invoke the valueOf method yourself;
* JavaScript automatically invokes it when encountering an object where a primitive value is expected.
* */

function Counter(first_value) {
    this.count = first_value;
    this.reset = function() { // function は使えなくなる。covertされるため
        this.count = 0;
    }
}

Counter.prototype = {
    valueOf: function() { // this prototype matters.
        return this.count;
    }
};

let count = new Counter(0);
count += 1; // 1
console.log(count+1); // 2
console.log(count);
console.log(Counter.toString())
