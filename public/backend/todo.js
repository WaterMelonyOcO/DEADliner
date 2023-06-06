const { v4 } = require("uuid")
const luxon = require("luxon")
const { writeFile, readFileSync, mkdir, existsSync, copyFileSync, rmSync, mkdirSync, readdirSync, rm } = require("fs");
const { ipcRenderer, shell } = require("electron");
const clock = require("date-events");
const { paths } = require("./paths");
const { resolve, sep, join, dirname } = require("path");

class TodoList {
    #TodoListArr = [];
    #complitedTodoList = []
    #uncomplitedTodoList = []
    #tegsArr = []

    constructor() {

        //кое как костылём сделал слушатель для вызова DEAD события

        try {

            this.exempleDate = luxon.DateTime;
            // console.log(this.#TodoListArr);
            this.#TodoListArr = JSON.parse(readFileSync(paths.db_path));
            console.log(this.#TodoListArr);
            this.#tegsArr = JSON.parse(readFileSync(paths.tagsDataPath));
            this.#TodoListArr.forEach((i) => {//проверяю есть ли свойво "выполнено"
                if (i.isDone === undefined) i.isDone = 0;
            })

            this.#complitedTodoList = this.#TodoListArr.filter((i) => i.isDone)//массив с выпонеными заданиями
            this.#uncomplitedTodoList = this.#TodoListArr.filter((i) => !i.isDone)//массив с не выполненными заданиями


        } catch (error) {
            console.log(error.message);
            return false;
        }

        this.#TodoListArr.forEach((i) => this.#checkDEAD(i.deadline));
        clock().on("*:*", () => {
            this.#TodoListArr.forEach((i) => this.#checkDEAD(i.deadline));
        })

        // ipcRenderer.on("deleteTask", (_, data) => {
        //     if (data) {
        //         this.deleteTask(data)
        //     }
        // })

        // ipcRenderer.on("trayAddTask", (ev, taskName, deadline, description, files) => {
        //     console.log("todo event", taskName, deadline, description, files);
        //     this.addTask(taskName, deadline, description, files);
        // })

        console.log("un|complited");
        console.log(this.#complitedTodoList);
        console.log(this.#uncomplitedTodoList);
    }

    /**
     * 
     * @param {String} taskName 
     * @param {String} deadline @description дата должна быть в формате YYTT-MM-DDThh:mm
     * @param {String} description 
     * @param {Array[String || path]} files 
     * @param {Array} tags
     * @return {Number} возвращает id таска
     */
    addTask(taskName, deadline, description = "", files = [], tegs = []) {

        let id = this.#TodoListArr.length + 1;
        this.files = [];
        this.tegs = tegs

        try {
            [this.deadline, this.cTime] = this.#verifyTime(deadline)
        }
        catch (err) {
            console.log(err);
            // ipcRenderer.send("exceptError", err)
            return false;
        }
        let newTaskFolder = join(paths.filesFolder, `task_${v4()}`)
        mkdirSync(newTaskFolder);
        for (let file of files) {
            copyFileSync(file.path, join(newTaskFolder, file.name));
            this.files.push(file.name)
        }

        console.log("configure task");

        let Task = {
            id: id,
            name: taskName,
            deadline: this.deadline,
            CreateTime: this.cTime,
            description: description,
            files: this.files,
            filePath: newTaskFolder,
            isDone: 0,
            tegs: this.tegs
        };

        this.#TodoListArr.push(Task);
        this.#uncomplitedTodoList.push(Task)
        writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });

        console.log(this.#TodoListArr);
        // ipcRenderer.send("createNotafication", {
        //     title: "добавление задание", description: `У лукоморья дуб зелёный;
        // Златая цепь на дубе том:
        // И днём и ночью кот учёный
        // Всё ходит по цепи кругом;`})

        console.log("un|complited");
        console.log(this.#uncomplitedTodoList);
        console.log(this.#complitedTodoList);
        return id;
    }

    getAllTegs() {
        return this.#tegsArr;
    }

    getTeg(name) {
        return this.#tegsArr.filter((i) => i.name === name)[0]
    }

    /**
     * 
     * @param {string} name 
     * @param {string} color 
     * @return {object}
     * @description создаёт тег и возвращает его
     * @example {id, name, color}
     */
    createTeg(name, color = '', value = '') {

        try {
            this.#existTagCheck(name);
        } catch (error) {
            console.error('[ERR] error on create tag');
            ipcRenderer.send("exceptError", error)
            return
        }

        const Teg = {
            name: name,
            color: color,
            value: value
        }
        console.log(Teg);
        console.log("CREATE TEG " + Teg.name);
        this.#tegsArr.push(Teg)
        writeFile(paths.tagsDataPath, JSON.stringify(this.#tegsArr), (err) => { if (err) console.log(err.message, "write error"); });
        return Teg;
    }

    /**
     * 
     * @param {Array} arr 
     * @returns {Array}
     * @description создаёт несколько тегов и возвращает массив содержащий их
     */
    createTegs(arr) {
        const tegsToAdd = []
        try {
            arr.forEach((el) => {
                if (this.#existTagCheck(el.name)) {
                    console.log(`${el.name} - такой тег уже есть. Пропускаю`);
                }
                else {
                    console.log("CREATE TEG " + el.name);
                    tegsToAdd.push({ name: el.name, value: el.value, color: el.color })
                }
            })
        } catch (error) {
            console.error('[ERR] error on create tag', error);
            ipcRenderer.send("exceptError", error)
            return
        }
        this.#tegsArr.push(...tegsToAdd)
        writeFile(paths.tagsDataPath, JSON.stringify(this.#tegsArr), (err) => { if (err) console.log(err.message, "write error"); });
        return tegsToAdd
    }


    /**
     * 
     * @param {number} id 
     * @param {Array} tags 
     * @description принимает массив тегов и добавляет их заданое задание. если в задание уже есть какие-то теги - удаляет
     */
    addTegsToTask(id, tegs) {

        const innerTags = this.getTask(id);
        const haveTegsName = innerTags.tegs.map((i) => i.name);
        console.log(haveTegsName);
        let uniquTegs;
        try {
            uniquTegs = tegs.map((i) => {
                if (haveTegsName.includes(i.name)) {
                    console.log("тег уже есть в этом задании");
                }
                else {
                    console.log('add tegs to task');
                    return i;
                }
            })
        } catch (error) {
            console.error('[ERR] error on create tag', error);
            ipcRenderer.send("exceptError", error);
            return
        }

        uniquTegs = uniquTegs.filter((i) => i !== undefined);
        innerTags.tegs.push(...uniquTegs);
        writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });
    }

    /**
     * @param {number} id 
     * @param {Object} tag 
     */
    addTagToTask(id, teg) {
        const innerTags = this.getTask(id).tags;

        try {
            if (innerTags.includes(teg)) {
                throw new Error("TASK_HAS_CURRENT_TEG")
            }
        } catch (error) {
            console.error('[ERR] error on create tag');
            ipcRenderer.send("exceptError", error)
            return
        }

        innerTags.push(teg);
        writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });
    }

    /**
     * 
     * @param {number} id 
     * @param {string} name 
     * @description удаляет тег из задания 
     */
    removeTegFromTask(id, name) {
        const Task = this.getTask(id)
        console.log("removeTagFromTask *****");
        console.log(Task);
        const delTagInd = Task.tegs.findIndex((i) => i.name === name)
        console.log(delTagInd);
        try {
            if (delTagInd < 0) { throw new Error("THIS_TAG_IS_NOT_EXIST") }
        } catch (error) {
            console.error('[ERR] error on create tag');
            ipcRenderer.send("exceptError", error)
            return
        }

        Task.tegs.splice(delTagInd, 1);
        writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });
        console.log("****************");
        return true;
    }

    /**
     * 
     * @param {number} id 
     * @description удаляет тег, вообще
     */
    removeTeg(tegName) {
        const index = this.#tegsArr.findIndex((i) => i.name === tegName)
        const delTag = this.#tegsArr.splice(index, 1)[0]
        console.log('[LOG] remove tag ' + delTag.name);
        writeFile(paths.tagsDataPath, JSON.stringify(this.#tegsArr), (err) => { if (err) console.log(err.message, "write error"); });
    }

    /**
     * @description возвращает массив с выполненными заданиями
     * @returns {Array}
     */
    getComplitedTask() {
        return this.#complitedTodoList
    }

    /**
    * @description возвращает массив с невыполненными заданиями
    * @returns {Array}
    */
    getUnComplitedTask() {
        return this.#uncomplitedTodoList
    }

    /**
     * 
     * @param {Number} id 
     * @description меняет статус задания на "выполненно"
     */
    toCompliteTask(id) {
        const TaskIndex = this.#uncomplitedTodoList.findIndex((i) => i.id === +id);
        const compTask = this.#uncomplitedTodoList.splice(TaskIndex, 1)[0];

        compTask.isDone = 1;
        this.#complitedTodoList.push(compTask);
        writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });
        console.log(`задание ${compTask} перенесено в выполненые`);
    }

    /**
     * 
     * @param {Number} id 
     * @return {Object}
     */
    getTask(id) {
        return this.#TodoListArr.filter((i) => i.id === id)[0];
    }

    getTasks() {
        return this.#TodoListArr
    }

    /**
     * @param {Object} opt
     * @param {Number} id 
     * @param {String} taskName 
     * @param {String} taskDesc 
     * @description функция для изменения даынных о задании
     */
    editTask({ id, taskName, taskDesc, tags }) {
        this.taskName = taskName;
        this.taskDesc = taskDesc
        this.tags = tags;
        let TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);

        // console.log(TaskIndex);
        if (TaskIndex < 0) { throw new Error("NO_ELEMENT") }

        this.#TodoListArr[TaskIndex].name = this.taskName;
        this.#TodoListArr[TaskIndex].description = this.taskDesc;
        this.#TodoListArr[TaskIndex].tags = this.tags;
        writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => { if (err) console.log(err.message, "write error"); });
        console.log(this.#TodoListArr);
        console.log("un|complited");
        console.log(this.#uncomplitedTodoList);
        console.log(this.#complitedTodoList);
    }

    /**
     * 
     * @param {Number} id 
     * @return {Boolean}
     */
    deleteTask(id) {
        const TaskIndex = this.#TodoListArr.findIndex((i) => i.id === +id);

        if (TaskIndex < 0) { throw new Error("NO_ELEMENT_TO_REMOVE") }

        try {
            const deletedTask = this.#TodoListArr.splice(TaskIndex, 1);
            this.#uncomplitedTodoList.splice(TaskIndex, 1);
            // this.#complitedTodoList.splice(TaskIndex, 1);
            writeFile(paths.db_path, JSON.stringify(this.#TodoListArr), (err) => {
                if (err)
                    console.log(err.message, "write error");
            });
            this.removeTaskFolder(deletedTask[0].filePath);
            return true
        } catch (error) {
            console.log("error on delete task\n", error);
            if( error.message === 'removed file not exist'){
                return true
            }
            // ipcRenderer("excetError", new Error("DELETE_TASK_ERROR"))
            return false;
        }
        finally {
            console.log(this.#TodoListArr);
            console.log("un|complited");
            console.log(this.#uncomplitedTodoList);
            console.log(this.#complitedTodoList);
        }

    }

    /**
     * 
     * @param {String} fileName 
     * @description рекурсивно обойдёт все папки заданий. Если ничего не найдёт - выкинет ошибку
     */
    openFile(fileName) {
        const path = this.#getFilePath(fileName);
        if (path) {
            shell.openPath(path)
                .then((data) => { console.log("open file ---- ", data); return })
                .catch((err) => { console.log("error on open file"); ipcRenderer("excetError", err); return })
        }
        // throw new Error("FILE_NOT_FOUND").name="FILE_NOT_EXIST";
    }

    /**
     * 
     * @param {path} path 
     */
    removeTaskFolder(path) {
        if (!existsSync(path)) {
            throw SyntaxError("removed file not exist");
        }
        rmSync(path, { force: true, recursive: true });
    }

    /**
     * 
     * @param {String} filename 
     * @description удаляет файл задания
     */
    deleteTaskFile(filename) {
        const path = this.#getFilePath(filename);
        rm(path, (data) => {
            if (data) console.log(data);
        })
    }

    /**
     * 
     * @param {path | string} file 
     */
    addFileToTask(id, file) {
        const Task = this.getTask(id);

        copyFileSync(file, Task.filePath);
        Task.file.push(file)
        console.log(`[LOG] добавлен файл в ${Task.filePath}`);
    }

    /**
     * 
     * @param {String} time 
     * @returns {luxon}
     */
    #timeFormat(time) {
        this.time = new Date(time).toISOString();
        // console.log(this.time);
        return luxon.DateTime.fromISO(this.time).toFormat("yyyy-MM-dd HH:mm");
    }

    #verifyTime(time) {
        console.log(time);
        this.dTime = this.#timeFormat(time);
        this.cTime = this.#timeFormat(new Date().toISOString());
        // console.log(this.dTime, this.cTime);

        if (this.dTime <= this.cTime) {
            throw Error("Date_Error");
        }
        else {
            return [this.dTime, this.cTime];
        }
    }

    #existTagCheck(name) {
        for (let i of this.#tegsArr) {
            if (i.name === String(name)) {
                console.log(i.name + '----' + name);
                // throw new Error("TAG_WITH_SAME_NAME_IS_EXIST")
                return true
            }
        }
        return false;
    }

    #checkDEAD(elem) {
        try {
            let trach = this.#verifyTime(elem);
            console.log("checked time");
        } catch (error) {
            console.log("DOOOM");
            ipcRenderer.send("createNotafication", {
                title: "Время вышло", description: `Скажи-ка, дядя, ведь недаром
            Москва, спаленная пожаром,
            Французу отдана?
            Ведь были ж схватки боевые,
            Да, говорят, еще какие!
            Недаром помнит вся Россия
            Про день Бородина!`})
            ipcRenderer.send("DOOMDAYEvent")
        }
    }

    #getFilePath(fileName) {
        for (let fold of readdirSync(paths.filesFolder)) {
            for (let file of readdirSync(resolve(paths.filesFolder, fold))) {
                if (file === fileName) {
                    return resolve(paths.filesFolder, fold, fileName);
                }
            }
        }
        return false;
    }

    #randomPhrase() {
        const phrases = JSON.parse(readFileSync(paths.phrasesPath))
        const randNumber = Math.floor(Math.random() * (phrases.length))
        const phrase = phrases[randNumber]

        return phrase
    }
}

let instance;

function TodoFactory(){
    if ( !instance ){
        instance = new TodoList()
        delete instance.constructor;
    }

    return instance
}

module.exports = TodoFactory()