type PartialWithNewMember<T> = {
    [P in keyof T]?: T[P];
} & { newMember: boolean }

type Sex = "Male" | "Female" | "Other";
interface Member {
    name: string,
    age: number,
    sex: Sex,
    newMember: boolean,
}

type newMemberInfo = PartialWithNewMember<Member>; // only 'newMember' is required!
let person: newMemberInfo = {
    newMember: true,
};

export {};