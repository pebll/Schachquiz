import {Tile} from "./Tile.js";
import {Game} from "./Game.js";
'use strict';
"use collections/list";

/*
1) Meine Idee war für den User Input jetzt einfach so eine RadioButton auswahl für felder zu machen.
Davon sollten zwei zufällig sein und eines korrekt. Wenn man das richtige auswählt und Submit drückt
kommt eine meldung "richtig"
2)später könnte man einen Punktestand einführen der erhöht wird bei richtigen guesses

 

*/









//--------------GLOBALE VARS----------------
let rightOption = 0;
let randomStartSquare = new Tile(0, 0, true);
let game = new Game(0, 0);
//------------------------------------------
export function generateQuestion() {
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
export function updateText() {
    document.getElementById("aufgabe").innerText = "Der Springer steht zunächst auf " + randomStartSquare.print() + ".";
    document.getElementById("punkte").innerText = "Punkte: " + String(game.points);
    document.getElementById("rang").innerText = "Rang: " + game.levelToString();

}
/**checkAnswer() wird direkt nach dem buttonclick ausgeführt */
export function checkAnswer() {
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
alert("Sicherheitsalert in main.js");