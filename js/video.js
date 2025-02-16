// 章节切换功能
document.querySelectorAll('.chapter-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.active-chapter')?.classList.remove('active-chapter');
        item.classList.add('active-chapter');
        // 待开发
    });
});

// 视频播放器功能
const video = document.querySelector('video');
video.addEventListener('play', () => {
    console.log('开始播放');
    // 待开发
});