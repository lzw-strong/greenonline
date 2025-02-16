// const span = document.querySelector(".user span")
// // 渲染函数，退出时也会用到
// function render() {
//     // 获取本地存储的用户数据
//     const uPhone = localStorage.getItem("go-phone")
//     // console.log(uPhone);
//     if (uPhone) {
//         span.innerHTML = `${uPhone}`
//     }
//     else {
//         span.innerHTML = `登录/注册`
//     }
// }
// render()

// const geto = document.querySelector(".user")
// geto.addEventListener("click", function () {
//     location.href = "./personalCenter.html"
// })

document.addEventListener('DOMContentLoaded', () => {
    const userDiv = document.querySelector(".user a");
    userDiv.addEventListener("click", function () {
        // 每次点击时实时检查 localStorage 的值
        if (localStorage.getItem("go-phone")) {
            window.location.href = "./personalCenter.html";
        }
        else {
            window.location.href = "./login.html";
        }
    });

    // 渲染函数
    const span = document.querySelector(".user span");
    function render() {
        const uPhone = localStorage.getItem("go-phone");
        if (uPhone) {
            span.innerHTML = `${uPhone}`;
        } else {
            span.innerHTML = `登录/注册`;
        }
    }
    render();
});