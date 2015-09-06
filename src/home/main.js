/**
 * author: wangyu39
 * description: 主菜单
 */

define(function (require) {
    var canvas = require('canvas/main');
    var config = require('config/main');
    var resource = require('resource/main');

    var home = {

        elm: {
            'begin': '开始',
            'height': 0,
            'background': '',
            'music': 'off'
        },
        reset: function () {

        },
        speed: 200,

        callback: null,
        // 初始化
        layout: function () {
            var ctx = canvas.getFContext2d();

            // 开始按钮
            ctx.fillStyle = 'rgb(250, 250, 250)';
            ctx.font = '24px Helvetica';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('开始游戏', canvas.canvasF.width / 3, canvas.canvasF.height / 5);
            // 音乐开关
            ctx.fillStyle = 'rgb(250, 250, 250)';
            ctx.font = '24px Helvetica';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('音乐on/off', canvas.canvasF.width / 3, canvas.canvasF.height / 5 * 2);

            // 查看排行榜
            ctx.fillStyle = '#000';
            ctx.font = '24px Helvetica';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('英雄榜', canvas.canvasF.width / 3, canvas.canvasF.height / 5 * 3);

            // 排行榜成绩展示
            if (localStorage.best && localStorage.heroName) {
                ctx.fillStyle = '#000';
                ctx.font = '24px Helvetica';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText(localStorage.heroName + ':' + localStorage.best, canvas.canvasF.width / 3, canvas.canvasF.height / 5 * 3.2);
            }
            if (localStorage.second && localStorage.heroName2) {
                ctx.fillStyle = '#000';
                ctx.font = '24px Helvetica';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText(localStorage.heroName2 + ':' + localStorage.second , canvas.canvasF.width / 3, canvas.canvasF.height / 5 * 3.4);
            }
        },

        // 切换背景音乐
        bgToggle: function () {
            var bg = this.elm.music;
            if (!eMusic) {
                var music = document.createElement('audio');
                music.setAttribute('src', './src/home/music/bg.mp3');
                music.setAttribute('id', 'bgMusic');
                document.body.appendChild(music);
                var eMusic = document.getElementById('bgMusic');
            }
            this.elm.music !== 'on' ? this.elm.music = 'on': this.elm.music = 'off';
            if (this.elm.music === 'on'){
                console.log('kaishi');
                eMusic.play();
            }
            else if (this.elm.music === 'off') {
                console.log("zanting");
                eMusic.pause();
            }

        },

        // 显示排行榜

        showBest: function () {
            if (!localStorage.best) {
                alert("先玩游戏才会有排行！");
            }
            else {
                alert("最好成绩是"+localStorage.best);
            }
        },

        init: function (callback) {
            var me = this;
            this.callback = callback;
            this.layout();
            canvas.canvasF.addEventListener(eStart, bind);
        }

    };

    function bind(e) {
        var home = require('home/main');
        console.log(eStart);
        var me = home;
        var height = window.document.body.clientHeight;
        var width = window.document.body.clientWidth;
        var beginTop = height / 5 - 20;
        var beginBottom = height / 5 + 40;
        var musicTop = height / 5 * 2 - 20;
        var musicBottom = height / 5 * 2 + 40;
        var heroTop = height / 5 *3 - 20;
        var heroBottom = height / 5 * 3 + 40;
        var commonLeft = width / 3;
        var commonRight = width / 3 * 2;
        var e = e.targetTouches[0];
        // console.log(e);

        if (e.pageX < commonRight && e.pageX > commonLeft) {
            if (e.pageY < beginBottom && e.pageY > beginTop) {
                console.log("点击了开始游戏");
                canvas.canvasF.removeEventListener(eStart, bind);
                home.callback();
            }
            else if (e.pageY < musicBottom && e.pageY > musicTop) {
                console.log('点击了背景音乐');
                home.bgToggle();
            }
            else if (e.pageY < heroBottom && e.pageY > heroTop) {
                console.log("点击了排行榜");
                home.showBest();
            }
        }

    };
    return home;
});