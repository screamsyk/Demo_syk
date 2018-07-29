//----------------------绘制倒数数字------------------------

//(1)初始化
var width = 1024;
var height = 568;
var colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
var balls = [];//保存绘制的彩色小球
var number = 9;//当前的数字
var points = numberPoints[number];//数字对应的点阵
var pointWidth = 10;//每个点的直径
var pointSpace = 8;//点与点之间的距离
var canvas = document.getElementById('canvasId');//画布
canvas.width = width;
canvas.height = height;
var cxt = canvas.getContext('2d');//画笔

//(2)绘制数字的方法
function drawNumber() {
    if (number == 0) {//更新数字
        number = 9;
        points = numberPoints[number];
    } else {
        number--;
        points = numberPoints[number];
    }
    cxt.clearRect(0, 0, width, height);//对指定区域内的绘制进行清除，避免下次绘制的叠加
    cxt.fillStyle = "#016dcf";
    for (var i in points) {
        for (var j in points[i]) {
            if (points[i][j] === 1) {
                var x = (pointWidth / 2 + pointSpace / 2) * (2 * j + 1);//圆心x坐标
                var y = (pointWidth / 2 + pointSpace / 2) * (2 * i + 1);//圆形y坐标
                cxt.beginPath();//路径开启
                cxt.arc(x, y, pointWidth / 2, 0, Math.PI * 2, true);//圆形路径
                cxt.closePath();//路径关闭
                cxt.fill();//开始填充
            }
        }
    }
    drawBall();
}

//(3)循环绘制数字
drawNumber();
setInterval(function () {
    drawNumber();
}, 1000);
setInterval(function () {
    //绘制小球
    cxt.clearRect(0, 0, width, height);
    balls.forEach(function (item) {
        cxt.beginPath();
        cxt.arc(item.x, item.y, pointWidth / 2, 0, Math.PI * 2, true);
        cxt.closePath();
        cxt.fillStyle = item.color;
        cxt.fill();
    });
    //更新绘制的小球，让小球动起来
    balls.forEach(function (item, index) {
        item.x = item.x + item.vx;
        item.y = item.y + item.vy;
        item.vy = item.vy + item.g;
        if (item.y >= height - pointWidth / 2) {
            item.y = height - pointWidth / 2;
            item.vy = -item.vy * 0.75;//反弹
        }
        if (item.x >= width || item.x <= 0) {
            balls.splice(index, 1);
        }
    });
    //绘制数字
    cxt.fillStyle = "#016dcf";
    for (var i in points) {
        for (var j in points[i]) {
            if (points[i][j] === 1) {
                var x = (pointWidth / 2 + pointSpace / 2) * (2 * j + 1);//圆心x坐标
                var y = (pointWidth / 2 + pointSpace / 2) * (2 * i + 1);//圆形y坐标
                cxt.beginPath();//路径开启
                cxt.arc(x, y, pointWidth / 2, 0, Math.PI * 2, true);//圆形路径
                cxt.closePath();//路径关闭
                cxt.fill();//开始填充
            }
        }
    }
}, 50);

//(4)绘制彩色小球
function drawBall() {
    for (var i in points) {
        for (var j in points[i]) {
            if (points[i][j] === 1) {
                var ball = {
                    x: (pointWidth / 2 + pointSpace / 2) * (2 * j + 1),//圆心x坐标
                    y: (pointWidth / 2 + pointSpace / 2) * (2 * i + 1),//圆形y坐标
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 2,//x轴方向的速度
                    vy: -5,//y轴方向的速度
                    g: 1.5 + Math.random(),//y轴方向的减速
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                cxt.beginPath();//路径开启
                cxt.arc(ball.x, ball.y, pointWidth / 2, 0, Math.PI * 2, true);//圆形路径
                cxt.closePath();//路径关闭
                cxt.fillStyle = ball.color;
                cxt.fill();//开始填充
                balls.push(ball);
            }
        }
    }
}
