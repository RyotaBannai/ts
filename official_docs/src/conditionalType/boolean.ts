function getGraduatedYear<T extends boolean>(o, x: T): T extends true ? number : null
{
    return o.graduated_year
}

interface Student
{
    id: number,
    name?: string,
    is_graduated: boolean,
    graduated_year: number | null,
}

let person: Student = {
    id: 1000001,
    is_graduated: false,
    graduated_year: null,
};

let person2: Student = {
    id: 1000001,
    is_graduated: true,
    graduated_year: 2020,
};

let x = getGraduatedYear(person, person.is_graduated);
let y = getGraduatedYear(person2, person2.is_graduated);
console.log(x);
console.log(y);


export {}