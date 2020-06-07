class Book {
    constructor(
        public code: number,
        public name: string,
    ) {}
}

const orderedBook = [
    new Book(1, 'ゴミでも分かるTypeScript'),
];

class Ticket {
    constructor(
        public code: string,
        public name: string,
    ) {}
}

const orderedTicket = [
    new Ticket('13101-tsconf', 'TS Conf Tokyo'),
];

type Code<T> = T extends { code: infer U } ? U : never;
type Item<T> = { code: Code<T> };

function filter<U>(list: Item<U>[], code: Code<U>): Item<U>[] {
    return list
        .filter(item => item.code === code)
        ;
}

console.info(filter<Book>(orderedBook, 1));
console.info(filter<Ticket>(orderedTicket, '23100-mokumoku'));