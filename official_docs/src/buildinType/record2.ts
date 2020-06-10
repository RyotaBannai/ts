interface Animal {
    name: string,
}
interface CatProps {
    age: number,
    breed: string,
}
function CatCounter(initial_count = 0) {
    let _uuid: number = initial_count;
    Object.defineProperty(this,"uuid", {
        get: function() { return ++_uuid; },
    })
}

let cat_counter = new CatCounter();
type Cat = Animal & Partial<CatProps> & { type: 'cat'};
class CreateCatRecord implements Cat {
    constructor(
        public name: string,
        public type: 'cat' = 'cat',
        public age?: number,
        public breed?: string
    ) {}
}

const cats:{[id: string]: Cat} = {
    [cat_counter.uuid]: new CreateCatRecord('Tiger'),
    [cat_counter.uuid]: new CreateCatRecord('Kitty'),
    [cat_counter.uuid]: new CreateCatRecord('Max'),
};

function lookintoCatInfo () { // loopとか汎化処理
    console.log(`My name is ${this.name}. And I'm a ${this.type} (breed is ${this.breed}). My age is ${this.age}. Nice to meet you!`)
}
for (let [id, cat] of Object.entries(cats)) {
    lookintoCatInfo.call(cat);
}

/*
*
* interface PageInfo {
*     title: string;
* }
* type Page = 'home' | 'about' | 'contact';
*
* const x: Record<Page, PageInfo> = {
*     about: { title: 'about' },
*     contact: { title: 'contact' },
*     home: { title: 'home' },
* };
*
* */