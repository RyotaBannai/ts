import * as _ from "lodash";
import {clog} from "../../../ts/src/library/generic";

interface Song {
    type: 'song',
    name: string,
    singer: string
}

interface Dance {
    type: 'dance',
    name: string,
    dancer: string
}

const getPerson0 = (item: any) => {
    if((item as Song).singer) // もし宣言されていなければ、undefined がかえるためそのまま条件判定できる
        return (item as Song).singer;
    else if ((item as Dance).dancer)
        return (item as Dance).dancer;
    else
        return "Unexpected Profession"
};

const items = [
    {type: 'song', name: 'Blinding Lights', singer: 'The Weeknd'},
    {type: 'dance', name: 'Laxed[Siren Beat]', dancer: 'Jawsh 685'},
    {type: 'comedy', name: 'Stand up comedy', comedian: 'Russell Peters'}
];

_.forEach(items, function(item) {
    clog(getPerson0(item))
});