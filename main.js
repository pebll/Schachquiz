'use strict';
/*
function ausgabe(vorname) {
    alert('JavaScript-Tutorial für '+ vorname  +'- jetzt JavaScript lernen');
    console.log('Inhalt der Variable innerhalb der Funktion:' + vorname)
    return vorname;
}
let name = 'Sonja';
let vorname = ausgabe(name);

console.log('Inhalt der Variable außerhalb der Funktion:' + vorname);
console.info('Länge der Variablen außerhalb der Funktion: ' + vorname.length);

//VERGLEICH einer Variablen mitsamt ihrem Datentyp:
var leider_viel_zu_früh_verglichen = 4 === 4;
console.log(leider_viel_zu_früh_verglichen);
*/

let randomFile = parseInt(Math.random() * 8);
let randomRank = parseInt(Math.random() * 8);



let randomsquare = (String(files[randomFile]) + String(ranks[randomRank]));
alert("Wohin kann der Springer auf " + randomsquare + " ?");

function checkLegalHorseeMove(tile1_x, tile2) {

}

class Tile {

    // file & rank in integers, to String method prints out the actual name of the tile
    constructor(file, rank) {
        this.file = file;
        this.rank = rank;
    }
    constructor() {
        this.file = files;
        this.rank = rank;
    }

    print() {
        let files = ["a", "b", "c", "d", "e", "f", "g", "h"];
        let ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        return String(files[file]) + String(rank[rank])
    }
}

//yeet




//hui

