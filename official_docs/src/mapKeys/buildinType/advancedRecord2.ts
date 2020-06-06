declare function mapObject<K extends string, T, U>(
    obj: {[P in K]: T},
    fn: (x: T, k?: K) => U
): {[P in K]: U};

const nameLengths= mapObject({
    firstName: 'Yosuke',
    lastName: 'Kurami'
}, (x => x.length));

console.log(nameLengths)