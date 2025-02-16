// 1.手机号
const phone = document.querySelector("[name=phone]")
// 使用change事件
phone.addEventListener("change", verifyPhone)
// 封装verifyName函数
function verifyPhone() {
    const div = phone.nextElementSibling
    // 定义正则 手机号
    const reg = /^1[3-9]\d{9}$/
    if (!reg.test(phone.value)) {
        div.innerHTML = "请输入正确的11位手机号码"
        return false
    }
    // 合法的手机号码 清空提示
    div.innerHTML = ""
    return true
}

// 2.密码
const password = document.querySelector("[name=password]")
// 使用change事件
password.addEventListener("change", verifyPwd)
// 封装verifyPwd函数
function verifyPwd() {
    const div = password.nextElementSibling
    // 定义正则 密码
    const reg = /^[a-zA-Z0-9-._]{6,20}$/
    if (!reg.test(password.value)) {
        div.innerHTML = "请输入6~20位数字字母符号组成的密码"
        return false
    }
    // 合法的密码 清空提示
    div.innerHTML = ""
    return true
}

// 5.提交模块
const submit = document.querySelector("[name=loginForm]")
submit.addEventListener("submit", function (e) {
    e.preventDefault()

    const dataPhone = localStorage.getItem("go-phone")
    const dataPassword = localStorage.getItem("go-password")

    // 验证账号密码是否为空或者错误
    function comparePnAndPw() {
        if (!phone.value.trim() || !password.value.trim()) {
            alert("请填写账号和密码");
            return false
        }
        if (phone.value !== dataPhone || password.value !== dataPassword) {
            alert("账号或密码错误")
            return false
        }
        return true
    }

    // 判断输入框内容是否正确，如果不正确则会一直阻止表单提交
    if (!verifyPhone()) {
        e.preventDefault()
    }
    if (!verifyPwd()) {
        e.preventDefault()
    }
    if (!comparePnAndPw()) {
        e.preventDefault()
        return
    }
    // 登录成功后返回登录页面
    location.href = "./index.html"
})