'use strict';
"use collections/list";
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


class Tile {
    // file & rank in integers, to String method prints out the actual name of the tile
    constructor(file = -1, rank = -1) {
        this.file = file;
        this.rank = rank;
        if ((this.file < 0 || this.file > 7 || this.file < 0 || this.file > 7)) {
            this.file = parseInt(Math.random() * 8);
            this.rank = parseInt(Math.random() * 8);
        }
    }

    print() {
        let files = ["a", "b", "c", "d", "e", "f", "g", "h"];
        let ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
        return String(files[this.file]) + String(ranks[this.rank]);
    }

    isOnBoard() {
        if (this.file < 0 || this.file > 7 || this.rank < 0 || this.rank > 7) {
            return false;
        }
        return true;
    }

    getKnightMoveTiles() {
        let availableMoves = new Array(0);
        let availableLegalMoves = new Array(0);
        availableMoves.push(new Tile(this.file + 2, this.rank + 1));
        availableMoves.push(new Tile(this.file + 2, this.rank - 1));
        availableMoves.push(new Tile(this.file - 2, this.rank + 1));
        availableMoves.push(new Tile(this.file - 2, this.rank - 1));
        availableMoves.push(new Tile(this.file + 1, this.rank + 2));
        availableMoves.push(new Tile(this.file + 1, this.rank - 2));
        availableMoves.push(new Tile(this.file - 1, this.rank + 2));
        availableMoves.push(new Tile(this.file - 1, this.rank - 2));

        let i = 0;
        for (i = 0; i < 8; i++) {
            if (availableMoves[i].isOnBoard()) {
                availableLegalMoves.push(availableMoves[i]);
            }
        }

        return availableLegalMoves;
    }
}

function tileListToString(list) {
    let string = "";
    let i = 0;
    for (i = 0; i < list.length; i++) {
        string += list[i].print();
        string += " ";
    }
    return string;
}

let randomsquare = new Tile();
alert("Wohin kann der Springer auf " + randomsquare.print() + " ?");
alert("Lösung: " + tileListToString(randomsquare.getKnightMoveTiles()))


