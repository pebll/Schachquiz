'use strict';
"use collections/list";
/*
1) Meine Idee war für den User Input jetzt einfach so eine RadioButton auswahl für felder zu machen.
Davon sollten zwei zufällig sein und eines korrekt. Wenn man das richtige auswählt und Submit drückt
kommt eine meldung "richtig"
2)später könnte man einen Punktestand einführen der erhöht wird bei richtigen guesses

 

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
    for (let i = 0; i < list.length; i++) {
        string += list[i].print();
        string += " ";
    }
    return string;
}

let rightOption = 0; //globale Variable

function generateQuestion(startSquare){
    rightOption = Math.floor(Math.random()*3); //zufallszahl zw 0 und 2
    let random = Math.floor(Math.random()*8); //zz zw 0 7
    for(let i = 0; i<3; i++){// in schleife schreibe die optionen in das HTML
        if(i != rightOption){ //weise zufallssquare zu, (dass aber auch ein legal square sein kan BUG!!!)
        document.getElementById(i).innerHTML = '<input type="radio" name="felder" value="option'+String(i)+'">'+new Tile().print()+'</input><br/>';
        }
        else{ //die korrekte Zugmöglichkeit
            document.getElementById(i).innerHTML = '<input type="radio" name="felder" value="option'+String(i)+'">'+startSquare.getKnightMoveTiles()[random].print()+'</input><br/>';
        }
    }
}
/**checkAnswer() wird direkt nach dem buttonclick ausgeführt */
function checkAnswer(){
    let antwort = document.querySelector('input[name="felder"]:checked').value; //value ist option1,option2 oder option3
    alert("Submitted " + antwort);
    if(antwort[6]==String(rightOption)){
        alert("Right!");
    }
}


//alert("Lösung: " + tileListToString(randomStartSquare.getKnightMoveTiles()))
//generateQuestion(randomStartSquare);
