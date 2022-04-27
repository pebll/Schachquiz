'use strict';
import {Tile} from "./Tile.js";

export function chessboardHTML(color1 ="black",color2 = "rgb(99,99,0)" ,
 highlightSquare = new Tile(4,7), highlightPieceMovement = "rook"){
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
            let currentTile = new Tile(j,7-i);         
            let currentIsReachable = false; //wird wahr gesetzt wenn die betreffliche Tile(7-i,j) gehihlighted werden soll
            switch(highlightPieceMovement){
                case "knight":   
                    highlightSquare.getKnightMoveTiles().forEach(reachableTile => {
                        currentIsReachable = (reachableTile.compare( currentTile))?true:false;
                        if(currentIsReachable ){
                            color="red";
                        }
                    });
                    break;
                case "bishop":
                    highlightSquare.getBishopMoveTiles().forEach(reachableTile => {
                        currentIsReachable = (reachableTile.compare( currentTile))?true:false;
                        if(currentIsReachable ){
                            color="green";
                        }
                    });
                    break;
                case "rook":
                    highlightSquare.getRookMoveTiles().forEach(reachableTile => {
                        currentIsReachable = (reachableTile.compare( currentTile))?true:false;
                        if(currentIsReachable ){
                            color="blue";
                        }
                    });
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