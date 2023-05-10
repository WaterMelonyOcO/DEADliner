
const btns = document.querySelectorAll("button")
// console.log(btns);
btns.forEach(element => {
    element.addEventListener('click', (e)=>api.send(element.id))
});

// const bt1 = document.querySelector("#1")
// const bt2 = document.querySelector("#2")

// bt1.addEventListener("click", ()=>{
//     api.send(1)
// })

// bt2.addEventListener("click", ()=>{
//     api.send(2)
// })