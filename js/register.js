// 1.短信验证码
const getCode = document.querySelector(".wall-input .getCode")
let flag = true //通过变量控制点击事件

let captcha = 0

// 点击事件  
getCode.addEventListener("click", function () {
    if (flag) {
        // 生成6位验证码
        captcha = Math.floor(100000 + Math.random() * 900000).toString();
        alert(`验证码为：${captcha}`)

        // 点击后不可再点击
        flag = false
        // 设计再次获取验证码时间
        let i = 60
        // getCode.innerHTML = `${i}秒后重新获取`
        // 开启计时器
        let timerId = setInterval(function () {
            i--
            i = (i < 10 ? "0" + i : i)
            getCode.innerHTML = `${i}秒后重新获取`
            if (i == 0) {
                // 关闭计时器
                clearInterval(timerId)
                getCode.innerHTML = `重新获取`
                // 时间到后又可以点击
                flag = true
            }
        }, 1000)
    }
})


// 2.手机号
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


// 3.密码
const password = document.querySelector("[name=password]")
// 使用change事件
password.addEventListener("change", verifyPwd)
// 封装verifyPwd函数
function verifyPwd() {
    const div = password.nextElementSibling
    // 定义正则 密码
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/
    if (!reg.test(password.value)) {
        div.innerHTML = "密码不符合要求，请包含大小写字母、数字和特殊字符"
        return false
    }
    // 合法的密码 清空提示
    div.innerHTML = ""
    return true
}


// 4.验证码
const codeInput = document.querySelector("[name=code]")
// 使用change事件
codeInput.addEventListener("change", verifyCode)
const div = codeInput.nextElementSibling

// 封装verifyCode函数
function verifyCode() {

    // 定义正则 验证码
    const reg = /^\d{6}$/
    if (!reg.test(codeInput.value)) {
        div.innerHTML = "请输入6位验证码"
        return false
    }
    // 合法的验证码 清空提示
    div.innerHTML = ""
    return true
}
// 比较验证码的函数
function compareVerifycode() {
    if (captcha !== codeInput.value) {
        div.innerHTML = "验证码错误"
        return false
    }
    // 正确的验证码 清空提示
    div.innerHTML = ""
    return true
}


// 5.提交模块
const agree = document.querySelector("[name=agreementCheckbox]")
const submit = document.querySelector("[name=registrationForm]")
submit.addEventListener("submit", function (e) {
    e.preventDefault()
    // 判断输入框内容是否正确，如果不正确则会一直阻止表单提交
    if (!verifyPhone()) {
        e.preventDefault()
    }
    if (!verifyPwd()) {
        e.preventDefault()
    }
    if (!verifyCode()) {
        e.preventDefault()
        return
    }
    if (!compareVerifycode()) {
        e.preventDefault()
        return
    }
    if (!agree.checked) {
        // 阻止表单的默认提交
        e.preventDefault()
        return alert("请勾选用户协议")
    }
    //记录用户名到本地存储
    localStorage.setItem("go-phone", phone.value)
    localStorage.setItem("go-password", password.value)

    // 注册成功后进入个人信息设置页面
    location.href = "./perseonalInformation.html"
})
