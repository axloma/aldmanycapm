
console.log("tryjsyasser")
const i = document.getElementById("id")
console.log(i)
// setInterval(() => {
//     console.log(i)
// }, 1000);
i.addEventListener("click",(e) => {
    e.preventDefault()
    console.log("clicked")
})