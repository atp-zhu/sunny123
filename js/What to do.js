document.addEventListener("DOMContentLoaded", function () {
  // 获取左侧菜单按钮
  const sigButton = document.querySelector(".box2 .left .bot .sig");
  const advButton = document.querySelector(".box2 .left .bot .adv");
  const welButton = document.querySelector(".box2 .left .bot .wel");

  // 获取右侧的三个图片区域（cent1区域）
  const images = document.querySelectorAll(".box2 .right .cent1");

  // 如果元素都存在
  if (sigButton && advButton && welButton && images.length >= 3) {
    // 监听滚动事件
    window.addEventListener("scroll", function () {
      const viewportHeight = window.innerHeight;

      // 获取图片相对于视窗的位置
      const rect1 = images[0].getBoundingClientRect();
      const rect2 = images[1].getBoundingClientRect();
      const rect3 = images[2].getBoundingClientRect();

      // 移除所有active类
      function removeAllActive() {
        sigButton.classList.remove("active");
        advButton.classList.remove("active");
        welButton.classList.remove("active");
      }

      // 计算图片是否位于视窗中央位置（视窗高度的50%处）
      const isInViewCenter = function (rect) {
        return (
          rect.top <= viewportHeight * 0.5 &&
          rect.bottom >= viewportHeight * 0.5
        );
      };

      // 根据图片位置添加active类
      if (isInViewCenter(rect3)) {
        // 第三张图片在视窗中央
        removeAllActive();
        welButton.classList.add("active");
      } else if (isInViewCenter(rect2)) {
        // 第二张图片在视窗中央
        removeAllActive();
        advButton.classList.add("active");
      } else if (isInViewCenter(rect1)) {
        // 第一张图片在视窗中央
        removeAllActive();
        sigButton.classList.add("active");
      }
    });

    // 初始触发一次滚动事件，确保页面加载时就设置正确的active状态
    window.dispatchEvent(new Event("scroll"));
  }
});
