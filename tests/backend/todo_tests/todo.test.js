const TL = require("../../../public/backend/todo");
let delRes;
let tegRes;
//test singleton
test("test on singlton", ()=>{
    let a = TL;
    let b = TL;

    expect( a ).toEqual( b )
    // expect( typeof a).toEqual(typeof b)
})

//test create task
test("test create task", ()=>{
    let a = TL;

    delRes = a.addTask("eeee", '2030-03-12T22:00');
    expect( delRes ).not.toBeNull()
})

//test delete task
test("delete task", ()=>{
    let a = TL;

    a.deleteTask(delRes);
    expect( a ).toBeTruthy()
})


//create tegs
test("create teg", ()=>{
    let a = TL;

    let res = a.createTeg('dfd', "345", 'ddodoododdood')
    expect(typeof res === "object").toBeTruthy()
    tegRes = res

})

test("remove teg", ()=>{
    let b = TL;

    let res = b.removeTeg(tegRes)
    expect(res).toBeTruthy()
})