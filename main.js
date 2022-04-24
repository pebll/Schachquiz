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

    //constructor überarbeitet: zufällige generierung von tiles muss explizit erwünscht werden, sonst fehler in getKnightMoveTiles()
    //erstellung zufälliger Tiles jetzt mit "new Tile(0,0,true)"
    constructor(file = -1, rank = -1 , randomGenerated = false) {     
        if(randomGenerated){
            this.file = parseInt(Math.random() * 8);
            this.rank = parseInt(Math.random() * 8);
        }
        else{
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
        if ((this.file < 0 || this.file > 7 )||( this.rank < 0 || this.rank > 7)) {
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
    getRandomKnightMoveTile(){
        let randomIndex = Math.floor(Math.random()*this.getKnightMoveTiles().length);
        return this.getKnightMoveTiles()[randomIndex];
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
let randomStartSquare = new Tile(0,0,true);

function generateQuestion(){
    rightOption = Math.floor(Math.random()*3); //zufallszahl zw 0 und 2
    
    for(let i = 0; i<3; i++){// in schleife schreibe die optionen in das HTML
        if(i != rightOption){ //weise zufallssquare zu, (dass aber auch ein legal square sein kan BUG!!!)
        document.getElementById(i).innerHTML = '<input type="radio" name="felder" value="option'+String(i)+'">'+new Tile(0,0,true).print()+'</input><br/>';
        }
        else{ //die korrekte Zugmöglichkeit
            document.getElementById(i).innerHTML = '<input type="radio" name="felder" value="option'+String(i)+'">'+randomStartSquare.getRandomKnightMoveTile().print()+'</input><br/>';
        }
    }
}
function showKnightPos(){
    document.getElementById("aufgabe").innerText = "Der Springer steht zunächst auf " + randomStartSquare.print() + ".";
}
/**checkAnswer() wird direkt nach dem buttonclick ausgeführt */
function checkAnswer(){
    let antwort = document.querySelector('input[name="felder"]:checked').value; //value ist option1,option2 oder option3
    
    if(antwort[6]==String(rightOption)){
        alert("Yuhu richtig! Auf zur nächsten Aufgabe!!");
        randomStartSquare = new Tile(0,0,true);
        showKnightPos();
    }
    else{
        
        document.getElementById("aufgabe").innerText = "Tja das war wohl falsch. Versuche es nocheinmal mit dem Springer auf dem Startpunkt "+randomStartSquare.print();
    }
    
    
    generateQuestion();
}  


let testSquare = new Tile(6,6)    
alert(" TestLösung: der Springer kann von "+ testSquare.print()+" nach " + tileListToString(testSquare.getKnightMoveTiles()));
//generateQuestion(randomStartSquare);
