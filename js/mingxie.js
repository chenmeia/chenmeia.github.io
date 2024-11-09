// 滚动时元素显示动画
const elements = document.querySelectorAll('.fade-in');

function checkVisibility() {
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    // 检查元素是否可见
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkVisibility);

// 页面加载时初始化检查
checkVisibility();
