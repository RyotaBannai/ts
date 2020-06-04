import * as _ from "lodash";
import {clog} from "../../../ts/src/library/generic";

interface Perform {
    (): string;
}

interface Song {
    type: 'song',
    name: string,
    singer: string,
    sing: Perform,
}

interface Dance {
    type: 'dance',
    name: string,
    dancer: string,
    dance: Perform,
}

interface Comedy {
    type: 'comedy',
    name: string,
    comedian: string,
    comedy: Perform,
}

const getPerson0 = (item: Song | Dance) => { // ... although passing comedian doesn't cause an error.
    if('sing' in item)
        return item.singer;
    else if ('dance' in item)
        return item.dancer;
    else
        return "Unexpected Profession"
};

const items = [
    {type: 'song', name: 'Blinding Lights', singer: 'The Weeknd', sing: () => 'Sing like a bird'} as Song,
    {type: 'dance', name: 'Laxed[Siren Beat]', dancer: 'Jawsh 685', dance: () => "dance like nobody's watching"} as Dance,
    {type: 'comedy', name: 'Stand up comedy', comedian: 'Russell Peters', comedy: () => 'Comedy like mr bean'} as Comedy
];

_.forEach(items, function(item) {
    clog(getPerson0(item))
});