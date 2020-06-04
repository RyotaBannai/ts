import * as _ from "lodash";
import {clog} from "../../../ts/src/library/generic";

interface Song {
    type: 'song',
    name: string,
    singer: string
}

interface Dance {
    type: 'dance', // just default value
    name: string,
    dancer: string
}

const getPerson0 = (item: any) => {
    if(isSong(item))
        return item.singer;
    else if (isDance(item))
        return item.dancer;
    else
        return "Unexpected Profession"
};

const isSong = (item: any): item is Song => // is XX のXXの部分は見栄えにすぎない
    item.type === 'song' && item.singer !== undefined;

const isDance = (item: any): item is Dance =>
    item.type === 'dance' && item.dancer !== undefined;

const items = [
    {type: 'song', name: 'Blinding Lights', singer: 'The Weeknd'},
    {type: 'dance', name: 'Laxed[Siren Beat]', dancer: 'Jawsh 685'},
    {type: 'comedy', name: 'Stand up comedy', comedian: 'Russell Peters'}
];

_.forEach(items, function(item) {
    clog(getPerson0(item))
});