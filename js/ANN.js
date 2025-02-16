// 电梯导航
(function () {
    const ann = document.querySelector(".ann")

    // 获取视口宽度（不包括滚动条）  
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // console.log(viewportWidth);

    window.addEventListener("scroll", function () {
        const n = document.documentElement.scrollTop
        // console.log(n);
        if (n >= 100 && viewportWidth >= 768) {
            ann.classList.add("visible");
        } else {
            ann.classList.remove("visible");
        }
    })

    // const n = document.querySelectorAll(".ann ul li")
})();

(function () {
    const list = document.querySelector(".ann ul");
    list.addEventListener("click", function (e) {
        // 阻止事件进一步冒泡
        e.stopPropagation();
        // 找到最近的li祖先元素  
        const li = e.target.closest('li');
        if (li) {
            // 移除原来的active  
            const old = document.querySelector(".ann ul .active");
            if (old) {
                old.classList.remove("active");
            }
            // 添加新的active  
            li.classList.add("active");

            // 特别处理“返回顶部”  
            if (li.id === "backTop") {
                // 直接将页面滚动到顶部  
                document.documentElement.scrollTop = 0;
                // 如果不需要给backTop添加active类，可以在这里不执行任何操作  
            } else {
                // 获取对应大盒子的offsetTop
                const top = document.querySelector(`.${e.target.id}`).offsetTop
                // 让页面滚动到相应的位置
                document.documentElement.scrollTop = top - 200
            }
        }
    });

    // 页面滚动时，根据大盒子选小盒子添加active
    window.addEventListener("scroll", function () {
        // const list = document.querySelector(".ann ul")
        // 移除原来的active  
        const old = document.querySelector(".ann ul .active");
        if (old) {
            old.classList.remove("active");
        }
        // 判断当前的滑动位置，选择小盒子

        // 获取五个盒子
        // const course = this.document.querySelector(".backCourse")
        // const RecommendOne = this.document.querySelector(".RecommendOne")
        // const RecommendTwo = this.document.querySelector(".backRecommendTwo")
        // const RecommendThree = this.document.querySelector(".backRecommendThree")
        // const RecommendFour = this.document.querySelector(".backRecommendFour")
        // const n = this.document.documentElement.scrollTop
        // if (n >= course.offsetTop && n < RecommendOne.offsetTop) {
        //     this.document.querySelector('[data-name=backCourse]').classList.add("active")
        // }
        // else if (n >= RecommendOne.offsetTop && n < RecommendTwo.offsetTop) {
        //     this.document.querySelector('[data-name=RecommendOne]').classList.add("active")
        // }
        // else if (n >= RecommendTwo.offsetTop && n < RecommendThree.offsetTop) {
        //     this.document.querySelector('[data-name=RecommendTwo]').classList.add("active")
        // }
        // else if (n >= RecommendThree.offsetTop && n < RecommendFour.offsetTop) {
        //     this.document.querySelector('[data-name=RecommendThree]').classList.add("active")
        // }
        // else if (n >= (RecommendFour.offsetTop - 200)) {
        //     this.document.querySelector('[data-name=RecommendFour]').classList.add("active")
        // }
    })
})();