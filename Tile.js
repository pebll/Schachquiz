
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
    getRookMoveTiles(){
        let availibleLegalMoves = new Array(0);
        for (let i = 0; i < 8; i++){
            if(i != this.rank){
            availibleLegalMoves.push(new Tile(this.file, i)); //für Leeres schachbrett!
            }
        }
        for (let j = 0; j < 8; j++){
            if(j != this.rank){
            availibleLegalMoves.push(new Tile(j, this.rank)); //für Leeres schachbrett!
            }
        }
        return availibleLegalMoves;
    }
    getBishopMoveTiles(){
        if(!this.isOnBoard()){
            return; //Fehler wenn betreffender Läufer net auf Brett
        }
        let availibleLegalMoves = new Array(0);
        let i; 
        let currentTile;
        //LinksUnten - RechtsOben - Diagaonale
        i = 1;
        currentTile = new Tile(this.file + i,  this.rank + i);
        while(currentTile.isOnBoard() & (this.file+i <8) & (this.rank + i <8)){
            availibleLegalMoves.push(currentTile);         
            i++;
            currentTile = new Tile(this.file + i,  this.rank + i)
        }
        i = -1;
        currentTile = new Tile(this.file + i,  this.rank + i);
        while(currentTile.isOnBoard() & (this.file + i >= 0) & (this.rank + i >= 0)){
            availibleLegalMoves.push(currentTile);         
            i--;
            currentTile = new Tile(this.file + i,  this.rank + i);
        }
        //Links-Oben---Rechts-Unten-Diagonale
        i = 1;
        currentTile = new Tile(this.file + i,  this.rank - i);
        while(currentTile.isOnBoard() & (this.file+i <8) & (this.rank + i < 8)){
            availibleLegalMoves.push(currentTile);         
            i++;
            currentTile = new Tile(this.file + i,  this.rank - i)
        }
        i = -1;
        currentTile = new Tile(this.file + i,  this.rank - i);
        while(currentTile.isOnBoard() & (this.file+i >= 0) & (this.rank + i  >=  0)){
            availibleLegalMoves.push(currentTile);         
            i--;
            currentTile = new Tile(this.file + i,  this.rank - i)
        }



        
        
        return availibleLegalMoves;
    }

    pieceMovableHere(piecePositionTile, piece){
        
        switch(piece){
            case "knight":
                let result = false;
                this.getKnightMoveTiles().forEach(element => { 
                    //alert(element.print() + "!=" +piecePositionTile.print());
                    result = element == piecePositionTile ;  
                    if(result){
                        return result;
                    } 
                });
                return result;
                break;
            case "bishop":
                this.getBishopMoveTiles().forEach(element => { 
                    return element == piecePositionTile ;   
                });
                break;
            case "rook":
                this.getRookMoveTiles().forEach(element => { 
                    return element == piecePositionTile ;   
                });
                break;
            default:
                return true;
                break;
        }
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
        if (availableTiles.includes(tile) || this.getDistanceToTile(tile) > 4 || this.getDistanceToTile(tile) == 0) {
            return this.getRandomKnightNotMoveTile();
        }
        return tile;
    }

    getDistanceToTile(tile) {
        return Math.sqrt(Math.pow(Math.abs(tile.rank - this.rank), 2 + Math.pow(Math.abs(tile.file - this.file), 2)));
    }
}
