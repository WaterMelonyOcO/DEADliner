const { dialog } = require("electron");


async function DOOMDAY( confg, db=null ) {
    const { readFile, rm } = require("fs/promises")
    const isBabe = await readFile(confg)
        .then(data => JSON.parse(data))
        .then(data => data.option.isBaby)
    /*
    if ( !isBabe ){//если false то удаляются только задния
        rm(this.#db_path, {force: true})
        .then(res => {
        console.log(res); 
        console.log("delete tasks");
        app.exit(0)
        })
    }
    else{
        rm(this.#homeDir, {recursive: true,force: true})
        .then(res => {
        // console.log(res); 
        console.log("remove all folder");
        app.exit(0)
        })
    }*/

    dialog.showErrorBox("Удаление", "вы пропустили время сдачи, пока!")

}

function invalidDate(arg=null){
    dialog.showErrorBox("Неправильное время", "Вы ввели неправильно время.\n пожалуйста введите корректную дату и время")
    console.log(arg);
}


module.exports = { DOOMDAY, invalidDate };
