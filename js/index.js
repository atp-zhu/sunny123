document.addEventListener("DOMContentLoaded", function () {
  const box2 = document.querySelector(".box2");
  const box2Left = document.querySelector(".box2>.left");
  const box2Right = document.querySelector(".box2>.right");
  const box6 = document.querySelector(".box6");
  const backToTop = document.getElementById("back-to-top");

  // 保存初始位置数据
  let box2LeftWidth = 0;
  let box2RightWidth = 0;
  let box2OriginalTop = 0;
  let box2Offset = 0;

  // 初始化数据
  function initMeasurements() {
    if (!box2 || !box2Left || !box2Right) return;

    // 重置样式以便正确测量
    resetStyles();

    // 记录初始状态
    box2LeftWidth = box2Left.offsetWidth;
    box2RightWidth = box2Right.offsetWidth;
    box2OriginalTop = box2.offsetTop;
    box2Offset = box2.getBoundingClientRect().left;

    // 设置元素的初始样式
    // 确保box2有合适的高度来容纳right元素
    const totalHeight = Math.max(box2Right.scrollHeight, box2Left.scrollHeight);
    box2.style.minHeight = totalHeight + "px";

    // 确保right始终绝对定位在box2内
    box2Right.style.position = "absolute";
    box2Right.style.top = "0";
    box2Right.style.right = "0";
    box2Right.style.width = box2RightWidth + "px";
  }

  // 重置所有样式
  function resetStyles() {
    if (!box2 || !box2Left || !box2Right) return;

    // 恢复所有元素的定位
    box2.style.minHeight = "";

    box2Left.style.position = "";
    box2Left.style.top = "";
    box2Left.style.left = "";
    box2Left.style.width = "";

    // 不重置right的position，始终保持绝对定位
    box2Right.style.width = "";
  }

  // 初始化
  initMeasurements();

  // 窗口大小改变时重新计算
  window.addEventListener("resize", function () {
    resetStyles();
    setTimeout(initMeasurements, 100);
  });

  // 监听滚动事件
  window.addEventListener("scroll", function () {
    if (!box2 || !box2Left || !box2Right || !box6) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const box2Rect = box2.getBoundingClientRect();
    const box6Rect = box6.getBoundingClientRect();

    // box2的顶部和底部位置
    const box2Top = box2Rect.top;
    const box2Bottom = box2Rect.bottom;

    // box6的顶部位置
    const box6Top = box6Rect.top;

    // 计算box2的区域是否在滚动范围内
    const isInScrollRange = box2Top <= 80;

    // 计算box6是否接近视口
    const isBox6Approaching = box6Top <= windowHeight + 100;

    if (isInScrollRange && !isBox6Approaching) {
      // 固定左侧
      box2Left.style.position = "fixed";
      box2Left.style.top = "80px";
      box2Left.style.left = box2Offset + "px";
      box2Left.style.width = box2LeftWidth + "px";
    } else if (isInScrollRange && isBox6Approaching) {
      // 当box6接近视口时，左侧需要跟随滚动
      const box2Height = box2Rect.height;
      const leftHeight = box2Left.offsetHeight;
      const distanceToBox6 = box6Top - windowHeight;

      // 计算left应当停留的位置，确保不会超出box2的底部
      const stopPosition = Math.min(
        box2Height - leftHeight,
        box2Height - leftHeight - distanceToBox6
      );

      box2Left.style.position = "absolute";
      box2Left.style.top = stopPosition + "px";
      box2Left.style.left = "0";
      box2Left.style.width = box2LeftWidth + "px";
    } else {
      // 默认状态，左侧不固定
      box2Left.style.position = "";
      box2Left.style.top = "";
      box2Left.style.left = "";
      box2Left.style.width = "";
    }

    // 显示或隐藏回到顶部按钮
    if (backToTop) {
      backToTop.style.display = scrollTop > 500 ? "flex" : "none";
    }
  });

  // 回到顶部按钮点击事件
  if (backToTop) {
    backToTop.style.display = "none";
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
