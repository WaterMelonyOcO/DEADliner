const content = document.querySelector("body");
const text = document.createElement("p")
MyDialog.getDesc((t)=>{
    text.textContent=t
})


document.querySelector("#ok")
.addEventListener("click",()=>{
    MyDialog.ErrorWindow()
})

content.appendChild(text)