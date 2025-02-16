// 获取父元素
const nav = document.querySelector(".nav")
// 给a注册事件
nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
        // console.log(11);
        // console.log(e.target.offsetLeft);
        document.querySelector(".nav .active").classList.remove("active")
        e.target.classList.add("active")
    }
})