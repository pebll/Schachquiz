'use strict'
export class Game {
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
