'use strict';
// mach die scheisse später kein bock mehr aucf ghtrhgmovlqdfvbknxcS.
class UserList {
    constructor() {
        let userList = new Array(0);
        let textFile = new File("userList.txt")
        // read the json file and save it to userList
        if (textFile.open("r") == true) {
            let s = "";
            if (f.open("r") == true) {
                while (!f.eof()) {
                    s += f.read(1);
                }
                f.close();
            }
            userList = JSON.parse(s);
        }
    }

    update() {
        // json data
        var jsonData = JSON.stringify(userList);

        fs.writeFile("userList.json", jsonData, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });
    }

}

let userList = new UserList();
userList.update();