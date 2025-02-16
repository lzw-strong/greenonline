// Avatar preview
document.getElementById('avatar').addEventListener('change', function (event) {
    const reader = new FileReader();
    reader.onload = function () {
        const avatarPreview = document.getElementById('avatar-preview');
        avatarPreview.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault(); // 阻止表单默认提交行为

    // 获取学号/工号、联系方式和邮箱字段值
    const id = document.getElementById('id').value.trim();
    const phoneNumber = document.getElementById('phonenumber').value.trim();
    const email = document.getElementById('email').value.trim();

    // 验证学号/工号（12位数字）
    const idPattern = /^\d{12}$/; // 检查是否为12位数字
    if (!idPattern.test(id)) {
        alert('学号/工号必须为12位数字！');
        return; // 阻止表单提交
    }

    // 验证联系方式（手机号码格式）
    const phoneNumberPattern = /^1[3-9]\d{9}$/; // 检查是否为11位数字且以1开头
    if (!phoneNumberPattern.test(phoneNumber)) {
        alert('联系方式必须为11位数字的手机号码！');
        return; // 阻止表单提交
    }

    // 验证邮箱格式
    const emailPattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!emailPattern.test(email)) {
        alert('邮箱格式无效，请输入有效的邮箱地址！');
        return; // 阻止表单提交
    }

    // 显示提示框
    const notification = document.createElement('div');
    notification.textContent = "个人信息已修改";
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#e0e0e0';
    notification.style.color = '#333';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);

    // 2秒后移除提示框
    setTimeout(function () {
        document.body.removeChild(notification);
    }, 2000);

    // 表单数据保持在输入框中，无需额外输出
    // 设置成功后进入个人中心页面
    location.href = "./personalCenter.html"
});

// 页面加载时恢复数据
document.addEventListener('DOMContentLoaded', function () {
    // 检查是否有保存的数据
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);

        // 恢复表单数据
        document.getElementById('id').value = formData.id;
        document.getElementById('phonenumber').value = formData.phoneNumber;
        document.getElementById('email').value = formData.email;
        document.getElementById('avatar-preview').src = formData.avatar;
    }
});