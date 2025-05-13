// 等待DOM加载完成
document.addEventListener("DOMContentLoaded", function () {
  // 获取所有按钮元素
  const btn1 = document.querySelector(".btn1");
  const btn2 = document.querySelector(".btn2");
  const btn3 = document.querySelector(".btn3");
  const btn4 = document.querySelector(".btn4");

  // 获取所有内容区域
  const bot1 = document.querySelector(".bot1");
  const bot2 = document.querySelector(".bot2");
  const bot3 = document.querySelector(".bot3");
  const bot4 = document.querySelector(".bot4");

  // 获取所有按钮，用于切换active类
  const allBtns = document.querySelectorAll(".box2>.top>.item>span");

  // 初始状态：只显示第一个内容区域
  showContent(bot1);

  // 为按钮添加点击事件
  btn1.addEventListener("click", function () {
    setActiveButton(btn1);
    showContent(bot1);
  });

  btn2.addEventListener("click", function () {
    setActiveButton(btn2);
    showContent(bot2);
  });

  btn3.addEventListener("click", function () {
    setActiveButton(btn3);
    showContent(bot3);
  });

  btn4.addEventListener("click", function () {
    setActiveButton(btn4);
    showContent(bot4);
  });

  // 显示指定内容，隐藏其他内容
  function showContent(element) {
    // 隐藏所有内容区域
    bot1.style.display = "none";
    bot2.style.display = "none";
    bot3.style.display = "none";
    bot4.style.display = "none";

    // 显示指定的内容区域
    element.style.display = "flex";
  }

  // 设置活跃按钮样式
  function setActiveButton(activeBtn) {
    // 移除所有按钮的active类
    allBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    // 为当前点击的按钮添加active类
    activeBtn.classList.add("active");
  }
});
