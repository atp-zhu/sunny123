// document.addEventListener("DOMContentLoaded", function () {
//   // 获取box2及其left和right区域元素
//   const box2 = document.querySelector(".box2");
//   const leftSection = document.querySelector(".box2 > .left");
//   const rightSection = document.querySelector(".box2 > .right");
//   const firstImage = rightSection.querySelector(".img1"); // 右侧第一张图片容器
//   const secondImage = rightSection.querySelector(".img2"); // 获取第二张图片
//   const thirdImage = rightSection.querySelector(".img3"); // 获取第三张图片
//   const firstImageImg = firstImage ? firstImage.querySelector("img") : null; // 图片元素
//   const secondImageImg = secondImage ? secondImage.querySelector("img") : null; // 第二张图片元素
//   const thirdImageImg = thirdImage ? thirdImage.querySelector("img") : null; // 第三张图片元素

//   // 如果元素不存在，则退出
//   if (
//     !box2 ||
//     !leftSection ||
//     !rightSection ||
//     !firstImage ||
//     !firstImageImg ||
//     !secondImage ||
//     !secondImageImg ||
//     !thirdImage ||
//     !thirdImageImg
//   )
//     return;

//   // 存储原始元素位置，用于计算其他元素位置
//   let box2Rect = box2.getBoundingClientRect();
//   let rightRect = rightSection.getBoundingClientRect();
//   let firstImageRect = firstImage.getBoundingClientRect();
//   let secondImageRect = secondImage.getBoundingClientRect();
//   let thirdImageRect = thirdImage.getBoundingClientRect();

//   // 获取原始位置和样式
//   let box2OriginalTop = 0; // 将在滚动事件中初始化
//   let leftOriginalStyles = {
//     position: "absolute", // 已在CSS中设置为absolute
//     top: "0",
//     left: "0",
//     width: leftSection.offsetWidth,
//   };

//   // 获取图片原始样式
//   let firstImageOriginalStyles = {
//     position: firstImage.style.position || "relative",
//     top: firstImage.style.top || "0",
//     left: firstImage.style.left || "0",
//     width: firstImage.offsetWidth,
//     height: firstImage.offsetHeight,
//   };

//   // 获取第二张图片原始样式
//   let secondImageOriginalStyles = {
//     position: secondImage.style.position || "relative",
//     top: secondImage.style.top || "0",
//     left: secondImage.style.left || "0",
//     width: secondImage.offsetWidth,
//     height: secondImage.offsetHeight,
//     marginTop: getComputedStyle(secondImage).marginTop,
//   };

//   // 获取第三张图片原始样式
//   let thirdImageOriginalStyles = {
//     position: thirdImage.style.position || "relative",
//     top: thirdImage.style.top || "0",
//     left: thirdImage.style.left || "0",
//     width: thirdImage.offsetWidth,
//     height: thirdImage.offsetHeight,
//     marginTop: getComputedStyle(thirdImage).marginTop,
//   };

//   // 设置left区域的宽度，避免固定时宽度改变
//   leftSection.style.width = leftOriginalStyles.width + "px";

//   // 设置图片容器的宽度和高度
//   firstImage.style.width = firstImageOriginalStyles.width + "px";
//   firstImage.style.height = firstImageOriginalStyles.height + "px";
//   secondImage.style.width = secondImageOriginalStyles.width + "px";
//   secondImage.style.height = secondImageOriginalStyles.height + "px";
//   thirdImage.style.width = thirdImageOriginalStyles.width + "px";
//   thirdImage.style.height = thirdImageOriginalStyles.height + "px";

//   // 防抖函数，提高性能
//   function debounce(func, wait) {
//     let timeout;
//     return function () {
//       const context = this;
//       const args = arguments;
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func.apply(context, args), wait);
//     };
//   }

//   // 处理滚动事件的函数
//   function handleScroll() {
//     // 仅在首次滚动时获取原始位置
//     if (box2OriginalTop === 0) {
//       box2OriginalTop = box2.getBoundingClientRect().top + window.scrollY;
//       // 获取元素初始位置关系
//       box2Rect = box2.getBoundingClientRect();
//       rightRect = rightSection.getBoundingClientRect();
//       firstImageRect = firstImage.getBoundingClientRect();
//       secondImageRect = secondImage.getBoundingClientRect();
//       thirdImageRect = thirdImage.getBoundingClientRect();
//     }

//     // 获取box2相对于视口的位置
//     const currentBox2Rect = box2.getBoundingClientRect();
//     const box2Height = box2.offsetHeight;
//     const leftHeight = leftSection.offsetHeight;
//     const firstImageHeight = firstImage.offsetHeight;
//     const secondImageHeight = secondImage.offsetHeight;
//     const thirdImageHeight = thirdImage.offsetHeight;

//     // 获取当前图片相对于视口的位置
//     const currentSecondImageRect = secondImage.getBoundingClientRect();
//     const currentThirdImageRect = thirdImage.getBoundingClientRect();

//     // 计算图片相对于右侧容器的原始左偏移量
//     const originalLeftOffset = firstImageRect.left - rightRect.left;
//     const secondImageLeftOffset = secondImageRect.left - rightRect.left;
//     const thirdImageLeftOffset = thirdImageRect.left - rightRect.left;

//     // 当box2达到距离顶部80px的位置时
//     if (currentBox2Rect.top <= 80) {
//       // 固定left区域
//       leftSection.style.position = "fixed";
//       leftSection.style.top = "80px";
//       leftSection.style.left = box2Rect.left + "px";

//       // 同时固定第一张图片
//       firstImage.style.position = "fixed";
//       firstImage.style.top = "80px";
//       // 使用原始边界矩形计算正确的左偏移位置
//       firstImage.style.left =
//         box2Rect.left +
//         rightRect.left -
//         box2Rect.left +
//         originalLeftOffset +
//         "px";

//       // 添加fixed类
//       if (!firstImage.classList.contains("fixed")) {
//         firstImage.classList.add("fixed");
//       }

//       // 检查第二张图片是否需要固定
//       // 第二张图片顶部距离视口顶部的距离
//       if (currentSecondImageRect.top <= 80) {
//         // 固定第二张图片
//         secondImage.style.position = "fixed";
//         secondImage.style.top = "80px";
//         secondImage.style.left =
//           box2Rect.left +
//           rightRect.left -
//           box2Rect.left +
//           secondImageLeftOffset +
//           "px";
//         secondImage.style.marginTop = "0"; // 去掉固定时的margin-top

//         // 添加fixed类
//         if (!secondImage.classList.contains("fixed")) {
//           secondImage.classList.add("fixed");
//         }
//       } else {
//         // 恢复第二张图片原始样式
//         secondImage.style.position = secondImageOriginalStyles.position;
//         secondImage.style.top = secondImageOriginalStyles.top;
//         secondImage.style.left = secondImageOriginalStyles.left;
//         secondImage.style.marginTop = secondImageOriginalStyles.marginTop;
//         secondImage.classList.remove("fixed");
//       }

//       // 检查第三张图片是否需要固定
//       if (currentThirdImageRect.top <= 80) {
//         // 固定第三张图片
//         thirdImage.style.position = "fixed";
//         thirdImage.style.top = "80px";
//         thirdImage.style.left =
//           box2Rect.left +
//           rightRect.left -
//           box2Rect.left +
//           thirdImageLeftOffset +
//           "px";
//         thirdImage.style.marginTop = "0"; // 去掉固定时的margin-top

//         // 添加fixed类
//         if (!thirdImage.classList.contains("fixed")) {
//           thirdImage.classList.add("fixed");
//         }
//       } else {
//         // 恢复第三张图片原始样式
//         thirdImage.style.position = thirdImageOriginalStyles.position;
//         thirdImage.style.top = thirdImageOriginalStyles.top;
//         thirdImage.style.left = thirdImageOriginalStyles.left;
//         thirdImage.style.marginTop = thirdImageOriginalStyles.marginTop;
//         thirdImage.classList.remove("fixed");
//       }

//       // 检查第二张图片是否到达第一张图片底部位置
//       // 第一张图片底部位置 = 顶部位置(80px) + 图片高度
//       const firstImageBottom = 80 + firstImageHeight;

//       // 当第二张图片顶部达到或超过第一张图片底部时，开始覆盖效果
//       if (currentSecondImageRect.top <= firstImageBottom) {
//         // 计算覆盖比例，基于第二张图片进入第一张图片底部后的滚动距离
//         // 假设覆盖过程需要滚动300px，增加覆盖时间
//         const overlapDistance = 300;
//         const overlapProgress = Math.min(
//           1,
//           Math.max(
//             0,
//             (firstImageBottom - currentSecondImageRect.top) / overlapDistance
//           )
//         );

//         // 当覆盖开始时添加覆盖效果类并应用渐变不透明度
//         if (overlapProgress > 0) {
//           if (!secondImage.classList.contains("overlapping")) {
//             secondImage.classList.add("overlapping");
//           }

//           // 同时为第一张图片添加被覆盖效果
//           if (!firstImage.classList.contains("being-overlapped")) {
//             firstImage.classList.add("being-overlapped");
//           }

//           // 根据覆盖进度调整图片的不透明度，实现更平滑的过渡
//           firstImage.style.opacity = 1 - overlapProgress * 0.3; // 最低降至0.7的不透明度
//         } else {
//           // 否则移除覆盖效果类
//           secondImage.classList.remove("overlapping");
//           firstImage.classList.remove("being-overlapped");
//           firstImage.style.opacity = 1; // 恢复完全不透明
//         }
//       } else {
//         // 当不处于覆盖区域时，确保移除所有覆盖相关类
//         secondImage.classList.remove("overlapping");
//         firstImage.classList.remove("being-overlapped");
//         firstImage.style.opacity = 1; // 确保恢复完全不透明
//       }

//       // 检查第三张图片是否到达第二张图片底部位置
//       // 第二张图片底部位置 = 顶部位置(80px) + 图片高度
//       const secondImageBottom = 80 + secondImageHeight;

//       // 当第三张图片顶部达到或超过第二张图片底部时，开始覆盖效果
//       if (currentThirdImageRect.top <= secondImageBottom) {
//         // 计算覆盖比例，类似第二张图片的逻辑
//         const overlapDistance = 100;
//         const overlapProgress = Math.min(
//           1,
//           Math.max(
//             0,
//             (secondImageBottom - currentThirdImageRect.top) / overlapDistance
//           )
//         );

//         // 当覆盖开始时添加覆盖效果类
//         if (overlapProgress > 0) {
//           if (!thirdImage.classList.contains("overlapping")) {
//             thirdImage.classList.add("overlapping");
//           }

//           // 同时为第二张图片添加被覆盖效果
//           if (!secondImage.classList.contains("being-overlapped")) {
//             secondImage.classList.add("being-overlapped");
//           }
//         } else {
//           // 否则移除覆盖效果类
//           thirdImage.classList.remove("overlapping");
//           secondImage.classList.remove("being-overlapped");
//         }
//       } else {
//         // 当不处于覆盖区域时，确保移除所有覆盖相关类
//         thirdImage.classList.remove("overlapping");
//         secondImage.classList.remove("being-overlapped");
//       }

//       // 确保元素不会超出box2的底部
//       const box2Bottom = box2OriginalTop + box2Height;
//       const currentScrollBottom =
//         window.scrollY +
//         80 +
//         Math.max(
//           leftHeight,
//           firstImageHeight,
//           secondImageHeight,
//           thirdImageHeight
//         );

//       if (currentScrollBottom >= box2Bottom) {
//         // 如果将超出box2底部，改为绝对定位
//         leftSection.style.position = "absolute";
//         leftSection.style.top = box2Height - leftHeight + "px";
//         leftSection.style.left = "0";

//         // 同样处理第一张图片
//         firstImage.style.position = "absolute";
//         firstImage.style.top = box2Height - firstImageHeight + "px";
//         firstImage.style.left = originalLeftOffset + "px"; // 使用原始左偏移

//         // 处理第二张图片
//         secondImage.style.position = "absolute";
//         secondImage.style.top = box2Height - secondImageHeight + "px";
//         secondImage.style.left = secondImageLeftOffset + "px";
//         secondImage.style.marginTop = secondImageOriginalStyles.marginTop;

//         // 处理第三张图片
//         thirdImage.style.position = "absolute";
//         thirdImage.style.top = box2Height - thirdImageHeight + "px";
//         thirdImage.style.left = thirdImageLeftOffset + "px";
//         thirdImage.style.marginTop = thirdImageOriginalStyles.marginTop;

//         // 移除fixed类和其他效果类
//         firstImage.classList.remove("fixed");
//         firstImage.classList.remove("being-overlapped");
//         secondImage.classList.remove("fixed");
//         secondImage.classList.remove("overlapping");
//         secondImage.classList.remove("being-overlapped");
//         thirdImage.classList.remove("fixed");
//         thirdImage.classList.remove("overlapping");
//       }
//     } else {
//       // 恢复原始样式
//       leftSection.style.position = leftOriginalStyles.position;
//       leftSection.style.top = leftOriginalStyles.top;
//       leftSection.style.left = leftOriginalStyles.left;

//       // 同样恢复第一张图片样式
//       firstImage.style.position = firstImageOriginalStyles.position;
//       firstImage.style.top = firstImageOriginalStyles.top;
//       firstImage.style.left = firstImageOriginalStyles.left;

//       // 恢复第二张图片样式
//       secondImage.style.position = secondImageOriginalStyles.position;
//       secondImage.style.top = secondImageOriginalStyles.top;
//       secondImage.style.left = secondImageOriginalStyles.left;
//       secondImage.style.marginTop = secondImageOriginalStyles.marginTop;

//       // 恢复第三张图片样式
//       thirdImage.style.position = thirdImageOriginalStyles.position;
//       thirdImage.style.top = thirdImageOriginalStyles.top;
//       thirdImage.style.left = thirdImageOriginalStyles.left;
//       thirdImage.style.marginTop = thirdImageOriginalStyles.marginTop;

//       // 移除所有效果类
//       firstImage.classList.remove("fixed");
//       firstImage.classList.remove("being-overlapped");
//       secondImage.classList.remove("fixed");
//       secondImage.classList.remove("overlapping");
//       secondImage.classList.remove("being-overlapped");
//       thirdImage.classList.remove("fixed");
//       thirdImage.classList.remove("overlapping");
//     }
//   }

//   // 使用requestAnimationFrame优化滚动性能
//   let ticking = false;
//   window.addEventListener("scroll", function () {
//     if (!ticking) {
//       window.requestAnimationFrame(function () {
//         handleScroll();
//         ticking = false;
//       });
//       ticking = true;
//     }
//   });

//   // 监听窗口大小变化，重新计算尺寸
//   window.addEventListener(
//     "resize",
//     debounce(function () {
//       // 更新元素位置关系
//       box2Rect = box2.getBoundingClientRect();
//       rightRect = rightSection.getBoundingClientRect();
//       firstImageRect = firstImage.getBoundingClientRect();
//       secondImageRect = secondImage.getBoundingClientRect();
//       thirdImageRect = thirdImage.getBoundingClientRect();

//       // 更新box2高度，确保有足够空间容纳内容
//       const rightHeight = rightSection.offsetHeight;
//       const leftHeight = leftSection.offsetHeight;
//       box2.style.minHeight = Math.max(rightHeight, leftHeight, 1500) + "px"; // 确保至少有1500px高度

//       // 更新宽度
//       leftSection.style.width = "auto";
//       leftOriginalStyles.width = leftSection.offsetWidth;
//       leftSection.style.width = leftOriginalStyles.width + "px";

//       // 更新图片尺寸
//       firstImage.style.width = "auto";
//       firstImageOriginalStyles.width = firstImage.offsetWidth;
//       firstImage.style.width = firstImageOriginalStyles.width + "px";

//       secondImage.style.width = "auto";
//       secondImageOriginalStyles.width = secondImage.offsetWidth;
//       secondImage.style.width = secondImageOriginalStyles.width + "px";

//       thirdImage.style.width = "auto";
//       thirdImageOriginalStyles.width = thirdImage.offsetWidth;
//       thirdImage.style.width = thirdImageOriginalStyles.width + "px";

//       // 计算图片相对于右侧容器的原始左偏移量
//       const originalLeftOffset = firstImageRect.left - rightRect.left;
//       const secondImageLeftOffset = secondImageRect.left - rightRect.left;
//       const thirdImageLeftOffset = thirdImageRect.left - rightRect.left;

//       // 更新左侧和图片定位
//       if (leftSection.style.position === "fixed") {
//         leftSection.style.left = box2Rect.left + "px";

//         // 更新第一张图片位置
//         firstImage.style.left =
//           box2Rect.left +
//           rightRect.left -
//           box2Rect.left +
//           originalLeftOffset +
//           "px";

//         // 更新第二张图片位置
//         if (secondImage.style.position === "fixed") {
//           secondImage.style.left =
//             box2Rect.left +
//             rightRect.left -
//             box2Rect.left +
//             secondImageLeftOffset +
//             "px";
//         }

//         // 更新第三张图片位置
//         if (thirdImage.style.position === "fixed") {
//           thirdImage.style.left =
//             box2Rect.left +
//             rightRect.left -
//             box2Rect.left +
//             thirdImageLeftOffset +
//             "px";
//         }

//         // 同步fixed类状态
//         if (!firstImage.classList.contains("fixed")) {
//           firstImage.classList.add("fixed");
//         }
//       } else {
//         // 确保移除所有效果类
//         firstImage.classList.remove("fixed");
//         firstImage.classList.remove("being-overlapped");
//         secondImage.classList.remove("fixed");
//         secondImage.classList.remove("overlapping");
//         secondImage.classList.remove("being-overlapped");
//         thirdImage.classList.remove("fixed");
//         thirdImage.classList.remove("overlapping");
//       }

//       // 重置位置信息
//       box2OriginalTop = box2.getBoundingClientRect().top + window.scrollY;

//       // 重新处理滚动位置
//       handleScroll();
//     }, 150)
//   );

//   // 初始设置box2高度
//   const rightHeight = rightSection.offsetHeight;
//   const leftHeight = leftSection.offsetHeight;
//   box2.style.minHeight = Math.max(rightHeight, leftHeight, 1500) + "px"; // 确保至少有1500px高度

//   // 初始触发一次滚动事件
//   handleScroll();
// });
