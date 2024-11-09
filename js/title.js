// 1. 平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// 2. 滚动触发元素显示
const elements = document.querySelectorAll('.fade-in'); // 获取所有带有 fade-in 类的元素

function checkVisibility() {
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    // 检查元素是否可见
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      element.classList.add('visible');  // 元素变为可见
    }
  });
}

// 监听滚动事件
window.addEventListener('scroll', checkVisibility);

// 页面加载时初始化检查
checkVisibility();

// 3. 动态按钮点击效果
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', function() {
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 500); // 500毫秒后移除点击效果
  });
});

// 4. 背景视差效果
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  // 根据滚动的高度调整背景位置，产生视差效果
  heroSection.style.backgroundPosition = `center ${scrollY * 0.5}px`;
});

// 5. 导航栏动态隐藏和显示
const navbar = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  // 向下滚动时隐藏导航栏，向上滚动时显示导航栏
  if (currentScroll > lastScrollTop) {
    navbar.style.transform = 'translateY(-100%)'; // 向上滑动时隐藏导航栏
  } else {
    navbar.style.transform = 'translateY(0)'; // 向下滑动时显示导航栏
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 防止小于零的滚动值
});
