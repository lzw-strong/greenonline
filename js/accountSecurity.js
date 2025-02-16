document.addEventListener('DOMContentLoaded', () => {
    // 获取表单元素
    const passwordForm = document.querySelectorAll('.btn.btn-success')[0];
    const phoneForm = document.querySelectorAll('.btn.btn-success')[1];
    const securityForm = document.querySelectorAll('.btn.btn-success')[2];

    // 防止表单默认提交行为
    passwordForm.type = 'button';
    phoneForm.type = 'button';
    securityForm.type = 'button';

    // 页面加载时恢复数据
    const storedPhone = localStorage.getItem('go-phone');
    const storedPassword = localStorage.getItem('go-password');

    // 更新当前手机号
    if (storedPhone) {
        const maskedPhone = storedPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        document.querySelector('.form-control[name="当前手机号"]').value = maskedPhone;
    }

    // 密保问题恢复
    const securityQuestion1 = localStorage.getItem('go-security-question1');
    const securityAnswer1 = localStorage.getItem('go-security-answer1');
    if (securityQuestion1 && securityAnswer1) {
        document.querySelector('select[name="问题1"]').value = securityQuestion1;
        document.querySelector('input[name="答案1"]').value = securityAnswer1;
    }

    const securityQuestion2 = localStorage.getItem('go-security-question2');
    const securityAnswer2 = localStorage.getItem('go-security-answer2');
    if (securityQuestion2 && securityAnswer2) {
        document.querySelector('select[name="问题2"]').value = securityQuestion2;
        document.querySelector('input[name="答案2"]').value = securityAnswer2;
    }

    // 修改密码
    passwordForm.addEventListener('click', () => {
        const oldPassword = document.querySelector('.form-control[name="旧密码"]').value.trim();
        const newPassword = document.querySelector('.form-control[name="新密码"]').value.trim();
        const confirmPassword = document.querySelector('.form-control[name="确认新密码"]').value.trim();

        if (oldPassword !== storedPassword) {
            alert('旧密码错误，请重新输入');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('确认密码和新密码不一致');
            return;
        }

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/.test(newPassword)) {
            alert('密码不符合要求，请包含大小写字母、数字和特殊字符');
            return;
        }

        localStorage.setItem('go-password', newPassword);
        alert('密码修改成功');
    });

    // 获取验证码按钮逻辑
    document.getElementById('getCodeBtn').addEventListener('click', function () {
        const phone = document.getElementById('newPhone').value;

        if (!/^1[3-9]\d{9}$/.test(phone)) {
            alert('请先输入有效手机号');
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


    // 修改手机号
    phoneForm.addEventListener('click', () => {
        const newPhone = document.querySelector('.form-control[name="新手机号"]').value.trim();
        const code = document.querySelector('.form-control[name="验证码"]').value.trim();

        if (!/^1[3-9]\d{9}$/.test(newPhone)) {
            alert('手机号格式不正确');
            return;
        }

        // if (code !== '123456') { // 模拟验证码校验
        //     alert('验证码错误，请重新获取');
        //     return;
        // }

        localStorage.setItem('go-phone', newPhone);
        document.querySelector('.form-control[name="当前手机号"]').value = newPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        alert('手机号修改成功');
    });

    // 密保问题设置
    securityForm.addEventListener('click', () => {
        const question1 = document.querySelector('select[name="问题1"]').value;
        const answer1 = document.querySelector('input[name="答案1"]').value.trim();
        const question2 = document.querySelector('select[name="问题2"]').value;
        const answer2 = document.querySelector('input[name="答案2"]').value.trim();

        if (!question1 || !answer1 || !question2 || !answer2) {
            alert('请填写完整信息');
            return;
        }

        localStorage.setItem('go-security-question1', question1);
        localStorage.setItem('go-security-answer1', answer1);
        localStorage.setItem('go-security-question2', question2);
        localStorage.setItem('go-security-answer2', answer2);
        alert('密保问题设置成功');
    });
});