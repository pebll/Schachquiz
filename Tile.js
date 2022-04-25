
'use strict';
"use collections/list";

export class Tile {
    // file & rank in integers, to String method prints out the actual name of the tile

    //constructor überarbeitet: zufällige generierung von tiles muss explizit erwünscht werden, sonst fehler in getKnightMoveTiles()
    //erstellung zufälliger Tiles jetzt mit "new Tile(0,0,true)" nice gemacht
    constructor(file = 0, rank = 0, randomGenerated = false) {
        if (randomGenerated) {
            this.file = parseInt(Math.random() * 8);
            this.rank = parseInt(Math.random() * 8);
        }
        else {
            this.file = file;
            this.rank = rank;
        }
    }

    print() {
        let files = ["a", "b", "c", "d", "e", "f", "g", "h"];
        let ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
        return String(files[this.file]) + String(ranks[this.rank]);
        //return "["+(this.file+1)+"]"+(this.rank+1);
    }

    isOnBoard() {
        if ((this.file < 0 || this.file > 7) || (this.rank < 0 || this.rank > 7)) {
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

        for (let i = 0; i < 8; i++) {
            if (availableMoves[i].isOnBoard()) {
                availableLegalMoves.push(availableMoves[i]);
            }
        }
        return availableLegalMoves;
    }
    getRandomKnightMoveTile() {
        let randomIndex = Math.floor(Math.random() * this.getKnightMoveTiles().length);
        return this.getKnightMoveTiles()[randomIndex];
    }
    getRandomKnightNotMoveTile() {
        // inverse von getRandomKnightMoveTile() gibt eine random tile wo der springer nicht hin kann
        // rekursiv, returnt die tile sobald sie nicht available ist
        let tile = new Tile(0, 0, true);
        let availableTiles = this.getKnightMoveTiles();
        if (availableTiles.includes(tile)) {
            return this.getRandomKnightNotMoveTile();
        }
        return tile;

    }
}
