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



function generateQuestion(startSquare){
    let rightOption = Math.floor(Math.random()*3)+1; //zufallszahl zw 1 und 3
    let random = Math.floor(Math.random()*8); //zz zw 0 7
    

    for(let i = 0; i<3; i++){// in schleife schreibe die optionen in das HTML
        if(i != rightOption){ //weise zufallssquare zu, (dass aber auch ein legal square sein kan BUG!!!)
        document.getElementById(i+1).innerHTML = '<input type="radio" name="felder" id = "11" value="option1">'+new Tile().print()+'</input><br/>';
        }
        else{ //die korrekte Zugmöglichkeit
            document.getElementById(i+1).innerHTML = '<input type="radio" name="felder" id = "11" value="option1">'+startSquare.getKnightMoveTiles()[random].print()+'</input><br/>';
        }
    }
}
/**checkAnswer() wird direkt nach dem buttonclick ausgeführt */
function checkAnswer(){
    //let antwort = document.querySelector('input[name="felder"]:checked').id; //id ist 1,2 oder 3
    alert("Submitted");
}


//alert("Lösung: " + tileListToString(randomStartSquare.getKnightMoveTiles()))
//generateQuestion(randomStartSquare);
