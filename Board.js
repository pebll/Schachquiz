'use strict';
import {Tile} from "./Tile.js";

export function chessboardHTML(color1 ="black",color2 = "rgb(99,99,0)" ,
 highlightSquare = new Tile(0,3), highlightPieceMovement = "knight"){
    let result = "";
    let files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
    result += "<table width=300em height=300 cellspacing=0>"
    for (let i = 0; i < 8; i++){
        result += "<tr>"
        result += '<td>'+ranks[7-i]+'</td>';
        for(let j = 0; j < 8; j++){
            
            let color;
            color = ((i+j)%2==1)?color1:color2; //Schwarz Weiss Pattern
            switch(highlightPieceMovement){
                case "knight":
                    if(highlightSquare.pieceMovableHere(highlightSquare, "knight")){
                        color = "red";
                    }
                    //color = "red";
                    break;
                case "bishop":
                    color = "green";
                    break;
                case "rook":
                    color = "blue";
                    break;
                default:
                    break;

            }
            //die Felder hier haben jetzt auch eine "id"
            result += '<td bgcolor='+color+' width="11.11%" '+'id = "'+String(files[j])+String(ranks[7-i])+'"></td>'; 
        }
        result += "</tr>";
        
        
    }
    result += '<tr class="backColor" height="11.11%">';
        result += '<td></td>';
        for (let j = 0; j < 8; j++){
            result += '<td>'+ files[j] +'</td>';
        }
        
        result += "</tr>";
    result += "</table>"
    return result;

}