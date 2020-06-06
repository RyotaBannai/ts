let o: {
    readonly p: number;
} = {
    p : 123
};

function iMutateO(arg: {p: number}) {
    arg.p = 456; // 456!
    console.log(arg.p)
}

iMutateO(o);
