document.addEventListener('DOMContentLoaded', () => {
    // 获取表单元素
    const nameInput = document.querySelector('.form-control[name="姓名"]');
    const fieldSelect = document.querySelector('.form-select[name="教学领域"]');
    const bioTextarea = document.querySelector('.form-control[name="个人简介"]');

    // 获取用户信息和数据统计卡片
    const userInfoCard = document.querySelector('.profile-card');
    const userName = userInfoCard.querySelector('h4');
    const userField = userInfoCard.querySelector('p');
    const lastLoginTime = document.getElementById('lastLoginTime'); // 获取上次登录时间元素

    // 获取保存按钮
    const saveButton = document.querySelector('.btn-success');

    // 页面加载时恢复数据
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
        // 恢复表单数据
        nameInput.value = userProfile.name;
        fieldSelect.value = userProfile.field;
        bioTextarea.value = userProfile.bio;

        // 更新用户信息卡片
        userName.textContent = `${userProfile.name}老师`;
        userField.textContent = `${userProfile.field} | 教龄2年`;
        lastLoginTime.textContent = `上次登录：${userProfile.lastLoginTime}`;
    }

    // 保存修改功能
    saveButton.addEventListener('click', (e) => {
        e.preventDefault(); // 阻止表单默认提交行为

        // 获取表单数据
        const name = nameInput.value.trim();
        const field = fieldSelect.value;
        const bio = bioTextarea.value.trim();

        // 同步更新用户信息卡片
        userName.textContent = `${name}老师`;
        userField.textContent = `${field} | 教龄2年`;

        // 生成当前时间
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const currentTime = `${year}-${month}-${day} ${hours}:${minutes}`;

        // 更新上次登录时间
        lastLoginTime.textContent = `上次登录：${currentTime}`;

        // 保存表单数据到本地存储
        localStorage.setItem('userProfile', JSON.stringify({
            name,
            field,
            bio,
            lastLoginTime: currentTime
        }));

        // 提示保存成功
        alert('个人信息已成功保存！');
    });
});