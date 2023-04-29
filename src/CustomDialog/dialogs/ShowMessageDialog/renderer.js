
const content = document.querySelector("body")

MyDialog.getBtn((...[btn, desk])=>{
    let buttons = []
    for ( let i = 0; i < btn.length; i++){
        let button = document.createElement("button")
        button.className="chbut"
        button.id = i
        button.textContent = btn[i]
        button.addEventListener("click", (e)=>{
            e.preventDefault();
            MyDialog.send(+e.target.id)
            // console.log(e.target.id);
        })

        buttons.push(button)
    }
    const description = document.createElement("p").textContent = desk;
    content.append(description, ...buttons)
})


