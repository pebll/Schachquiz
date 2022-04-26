'use strict';

export function chessboardHTML(color1 = "rgb(99,99,0)",color2 = "black"){
    let result = "";
    let files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
    result += "<table width=300em height=300 cellspacing=0>"
    for (let i = 0; i < 8; i++){
        result += "<tr>"
        result += '<td>'+ranks[i]+'</td>';
        for(let j = 0; j < 8; j++){
            
            let color = ((i+j)%2==1)?color1:color2;
            result += '<td bgcolor='+color+' width="11.11%"></td>';
        }
        result += "</tr>";
        
        
    }
    result += '<tr class="backColor" height="11.11%">';
        result += '<td></td>';
        for (let j = 0; j < 8; j++){
            result += '<td>'+files[j]+'</td>';
        }
        
        result += "</tr>";
    result += "</table>"
    return result;

}