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

let points = 0; //global

class Game {
    constructor(points = 0, level = 0, levels = ["Novize", "Amateur", "Dude aus dem Achten", "Luca", "Dude aus dem Dritten"],
        difficultyArray = [1, 2, 4, 5, 6], colors = ["white", "red", "blue", "green", "purple"]) {
        this.points = 0;
        this.level = 0;

        if (difficultyArray.length == levels.length) {
            this.levels = levels;
            this.difficultyArray = difficultyArray;
            this.colors = colors;
        }
        else {
            alert("Fehler in class 'Game': es müssen gleich viele Punktestände zum aufleveln wie level da sein.");
            this.levels = ["DefaultNovize", "Amateur", "Clubspieler", "Luca", "der Typ aus dem dritten"];
            this.difficultyArray = [1, 2, 3, 5, 6];
            this.colors = ["white", "red", "blue", "green", "purple"];
        }
    }
    levelToString() {
        if (this.level < this.levels.length) {
            return this.levels[this.level];
        }
        else {
            return "EsGibtKeinMaßFürdeineIntelligenz"
        }
    }
    updateLevel() {
        let notUpToDate = this.difficultyArray[this.level] < this.points;
        let noMoreLevels = this.points > (this.difficultyArray[this.levels.length] + 1);
        if (notUpToDate & !noMoreLevels) {
            this.level++;
            this.updateLevel();
        }
    }
    getLevelColor() {

        if (this.level < this.levels.length) {
            return this.colors[this.level];
        }
        else {
            return "white";
        }
    }
    addPoint() {
        this.points++;
        this.updateLevel();
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

//--------------GLOBALE VARS----------------
let rightOption = 0;
let randomStartSquare = new Tile(0, 0, true);
let game = new Game(0, 0);
//------------------------------------------
function generateQuestion() {
    rightOption = Math.floor(Math.random() * 3); //zufallszahl zw 0 und 2

    for (let i = 0; i < 3; i++) {// in schleife schreibe die optionen in das HTML
        if (i != rightOption) { //weise zufallssquare zu, (dass aber auch ein legal square sein kan BUG!!!)
            document.getElementById(i).innerHTML = '<input type="radio" name="felder" value="option' + String(i) + '">' + randomStartSquare.getRandomKnightNotMoveTile().print() + '</input><br/>';
        }
        else { //die korrekte Zugmöglichkeit
            document.getElementById(i).innerHTML = '<input type="radio" name="felder" value="option' + String(i) + '">' + randomStartSquare.getRandomKnightMoveTile().print() + '</input><br/>';
        }
    }
}
function updateTheme() {
    document.getElementsByClassName("triggeredByLevelUp")[0].style.color = game.getLevelColor();
}
function updateText() {
    document.getElementById("aufgabe").innerText = "Der Springer steht zunächst auf " + randomStartSquare.print() + ".";
    document.getElementById("punkte").innerText = "Punkte: " + String(game.points);
    document.getElementById("rang").innerText = "Rang: " + game.levelToString();

}
/**checkAnswer() wird direkt nach dem buttonclick ausgeführt */
function checkAnswer() {
    if (document.querySelector('input[name="felder"]:checked') == null) {
        return; // avoid bugs when nothing selected
    }
    let antwort = document.querySelector('input[name="felder"]:checked').value; //value ist option1,option2 oder option3

    if (antwort[6] == String(rightOption)) {
        alert("Yuhu richtig! Auf zur nächsten Aufgabe!!");
        randomStartSquare = new Tile(0, 0, true);
        game.addPoint();

        updateText();
        updateTheme();

    }
    else {

        document.getElementById("aufgabe").innerText = "Tja das war wohl falsch. Versuche es nocheinmal mit dem Springer auf dem Startpunkt " + randomStartSquare.print();
    }


    generateQuestion();
}


// submit answer with enter aswell ( so that is faster )
window.onload = function () {
    var enter = 13;
    window.onkeydown = function (gfg) {
        if (gfg.keyCode === enter) {
            checkAnswer();
        };
    }
}
