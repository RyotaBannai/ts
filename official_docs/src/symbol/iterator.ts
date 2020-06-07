class List implements Iterable<number>{
    constructor(private items: Array<number>){}
    *[Symbol.iterator](): Iterator<number> { // * mark describes this is a generator.
        for(const item of this.items) {
            if(item % 2 == 0) yield item
        }
    }
}

const list = new List([1,2,3,4,5,6]);
for (const item of list){
    console.info(item);
}