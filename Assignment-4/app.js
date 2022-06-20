let hamIcon = document.querySelector(".fa-bars");
let display =document.querySelector("ul");
console.log(display);
hamIcon.addEventListener('click',()=>{
    hamIcon.classList.toggle("fa-times")
    display.classList.toggle("visible")
})
