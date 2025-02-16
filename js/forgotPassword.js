// 验证码
let codeVerification = '';
document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const phone = document.getElementById('phone').value;
    const code = document.getElementById('code').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElements = document.querySelectorAll('.error-message');

    // 清空错误提示
    errorElements.forEach(el => el.classList.remove('show'));

    // 手机号验证
    if (!validatePhone(phone)) {
        showError(document.querySelector('#phone ~ .error-message'), '请输入有效的手机号');
        return;
    }

    // 对验证码进行非空检查
    if (!code.trim()) {
        showError(document.querySelector('#code ~ .error-message'), '请输入验证码');
        return;
    }

    // 验证验证码是否正确
    if (code.trim() != codeVerification) {
        showError(document.querySelector('#code ~ .error-message'), '验证码不正确');
        return;
    }

    // // 密码长度检查
    // if (newPassword.length < 6 || newPassword.length > 20) {
    //     showError(document.querySelector('#newPassword + .error-message'), '密码长度需为6-20位');
    //     return;
    // }

    // 密码复杂度检查
    if (!validatePassword(newPassword)) {
        showError(document.querySelector('#newPassword ~ .error-message'), '密码长度需为6-20位');
        return;
    }

    // 对密码进行非空检查
    if (!newPassword.trim()) {
        showError(document.querySelector('#newPassword ~ .error-message'), '密码不能为空');
        return;
    }

    // 确认密码一致性
    if (newPassword !== confirmPassword) {
        showError(document.querySelector('#confirmPassword ~ .error-message'), '两次输入的密码不一致');
        return;
    }

    // 对确认密码进行非空检查
    if (!confirmPassword.trim()) {
        showError(document.querySelector('#confirmPassword ~ .error-message'), '密码不能为空');
        return;
    }

    // 模拟提交成功
    alert('密码重置成功，请重新登录！');

    // 更新本地存储中的密码为新密码
    localStorage.setItem("user-password", newPassword);

    location.href = "./personalCenter.html"
});

// 获取验证码按钮逻辑
document.getElementById('getCodeBtn').addEventListener('click', function () {
    const phone = document.getElementById('phone').value;
    const errorElement = document.querySelector('#phone + .error-message');

    if (!validatePhone(phone)) {
        showError(errorElement, '请先输入有效手机号');
        return;
    }

    // 生成随机验证码
    codeVerification = Math.floor(Math.random() * 899999) + 100000;
    alert(`您的验证码是：${codeVerification}`); // 弹出验证码

    // 模拟发送验证码
    let count = 60;
    this.disabled = true;
    this.textContent = `${count}s后重新获取`;
    const timer = setInterval(() => {
        count--;
        this.textContent = `${count}s后重新获取`;
        if (count <= 0) {
            clearInterval(timer);
            this.disabled = false;
            this.textContent = '获取验证码';
        }
    }, 1000);
});

// 手机号正则
function validatePhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
}

// 密码正则
function validatePassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/.test(password);
}

// 展示错误信息
function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.classList.add('show');
    } else {
        console.error('未找到错误提示元素');
    }
}