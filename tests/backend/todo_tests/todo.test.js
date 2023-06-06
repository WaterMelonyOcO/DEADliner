const TL = require("../../../public/backend/todo");
let delRes;
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
