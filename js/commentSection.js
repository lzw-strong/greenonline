// 文本字数
const commentContent = document.querySelector("#commentContent")
const total = document.querySelector(".total")
// 获得焦点
commentContent.addEventListener("focus", function () {
    total.style.opacity = 1

})
// 失去焦点
commentContent.addEventListener("blur", function () {
    total.style.opacity = 0

})
// 检测用户输入
commentContent.addEventListener("input", function () {
    // console.log(commentContent.value.length);
    total.innerHTML = `${commentContent.value.trim().length}/200字`
})


// 切换回复表单的显示与隐藏
function toggleReplyForm(button) {
    var form = button.parentNode.nextElementSibling;
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
}

// 删除评论
function deleteComment(button) {
    var comment = button.parentNode.parentNode.parentNode;
    comment.parentNode.removeChild(comment);
}

// 添加回复
function addReply(button) {
    var form = button.parentNode;
    var replyContent = form.querySelector('textarea').value.trim();
    if (replyContent !== '') {
        var reply = document.createElement('li');
        reply.className = 'comment';
        reply.innerHTML = `
            <div>
                <div class="user">
                    <a href="">
                        <div class="iconfont icon-geren"></div>
                        <i>用户</i>
                    </a>
                </div>
                <p class="content">评论道：${replyContent}</p>
                <div class="comment-actions">
                    <button class="btn" onclick="toggleReplyForm(this)">回复</button>
                    <button class="btn" onclick="deleteComment(this)">删除</button>
                </div>
                <form class="reply-form">
                    <textarea placeholder="在此处输入回复内容..."></textarea>
                    <button class="btn" type="button" onclick="addReply(this)">提交</button>
                </form>
            </div>
        `;
        var parentComment = form.parentNode;
        // 如果没有回复列表，创建一个
        if (parentComment.querySelector('.comment-list') === null) {
            var replyList = document.createElement('ul');
            replyList.className = 'comment-list';
            parentComment.appendChild(replyList);
        }
        // 将回复添加到父评论的回复列表中
        parentComment.querySelector('.comment-list').appendChild(reply);
        form.querySelector('textarea').value = ''; // 清空回复框
    }
}

// 添加评论
function addComment() {
    var commentContent = document.getElementById('commentContent').value.trim();
    if (commentContent !== '') {
        // 从本地存储中获取手机号
        var phone = localStorage.getItem('go-phone');
        if (!phone) {
            // 如果没有手机号则使用默认值
            phone = '匿名用户';
        }

        var commentList = document.getElementById('commentList');
        var comment = document.createElement('li');
        comment.className = 'comment';
        comment.innerHTML = `
            <div>
                <div class="user">
                    <a href="#">
                        <div class="iconfont icon-geren"></div>
                        <i>${phone}</i>
                    </a>
                </div>
                <p class="content">评论道：${commentContent}</p>
                <div class="comment-actions">
                    <button class="btn" onclick="toggleReplyForm(this)">回复</button>
                    <button class="btn" onclick="deleteComment(this)">删除</button>
                </div>
                <form class="reply-form">
                    <textarea placeholder="在此处输入回复内容..."></textarea>
                    <button class="btn" type="button" onclick="addReply(this)">提交</button>
                </form>
            </div>
        `;
        commentList.appendChild(comment);
        document.getElementById('commentContent').value = ''; // 清空评论框
    }
}

// 按下回车发布评论
commentContent.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        // console.log(11);
        addComment()
    }
})
