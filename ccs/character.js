// 玩家数据
const players = [
    {
        name: "玩家1",
        avatar: "img/KL.jpg",
        description: "玩家1的简介。",
        stats: { battle: 80, survival: 70, defense: 60, movement: 90, accuracy: 75 },
        background: "https://i-blog.csdnimg.cn/blog_migrate/5d968efbd51d95085166a06c7d99d62f.jpeg",
        logo: "img/server-icon.png"
    },
    {
        name: "Kali Linux",
        avatar: "img/KL.jpg",
        description: "Kali Linux的简介。",
        stats: { battle: 60, survival: 90, defense: 70, movement: 80, accuracy: 85 },
        background: "https://i-blog.csdnimg.cn/blog_migrate/5d968efbd51d95085166a06c7d99d62f.jpeg",
        logo: "img/server-icon.png"
    }
];

// 从URL参数获取玩家索引
function getPlayerFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('player'); // 获取 URL 中的 player 参数
    return playerId ? parseInt(playerId, 10) : 0;  // 如果没有参数，默认显示玩家 0
}

// 设置玩家信息
function setPlayer(index) {
    const player = players[index];

    // 更新头像、名称、介绍
    document.getElementById('player-avatar').src = player.avatar;
    document.getElementById('player-name').innerText = player.name;
    document.getElementById('player-description').innerText = player.description;

    // 设置背景图片
    document.body.style.backgroundImage = `url('${player.background}')`;

    // 更新雷达图
    drawRadarChart(player.stats);

    // 更新服务器LOGO
    document.querySelector('.server-logo').src = player.logo;

    // 使用GSAP做动画
    gsap.fromTo('.header', { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 });
    gsap.fromTo('.main-content', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    gsap.fromTo('.footer', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, delay: 1 });
}

// 使用Chart.js绘制雷达图
function drawRadarChart(stats) {
    const radarChart = document.getElementById('radar-chart');
    new Chart(radarChart, {
        type: 'radar',
        data: {
            labels: ['战斗', '生存', '防御', '移动', '精度'],
            datasets: [{
                label: '玩家属性',
                data: Object.values(stats),
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                borderColor: 'rgba(0, 255, 0, 0.8)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: { display: false },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 页面加载完成后，设置当前玩家
document.addEventListener('DOMContentLoaded', () => {
    const playerIndex = getPlayerFromURL();  // 获取URL中的玩家索引
    setPlayer(playerIndex);  // 设置玩家信息
});
