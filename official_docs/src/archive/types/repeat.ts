let Trash = function (name:string, type: string): void {
    this.name = name;
    this.type = type;
};

function repeat(trashes: object[], fn: Function): void{
    for(const trash of trashes){
        fn.call(trash)
    }
}

repeat([
    new Trash('チラシ', 'flammable'),
    new Trash('ビン', 'nonflammable'),
    new Trash('空き缶', 'nonflammable'),
    ],
    separateTrash
);

var frammable_trash_box:object[] = [],
    nonflammable_trash_box:object[] = [];

function separateTrash() {
    if(this.type === 'flammable')
        frammable_trash_box.push(this);
    else
        nonflammable_trash_box.push(this);
}

console.log(frammable_trash_box);
console.log(nonflammable_trash_box);