// 检查用户是否登录
function checkUserLogin() {
    // 从本地存储中获取手机号
    const phone = localStorage.getItem('go-phone');

    if (!phone) {
        // 如果没有手机号，则跳转到登录页面
        window.location.href = './login.html';
    }
}

// 页面加载时自动检查登录状态
window.onload = function () {
    checkUserLogin();
};