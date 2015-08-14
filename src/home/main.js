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
        // 初始化
        layout: function () {
            var ctx = canvas.getContext2d();

            // 开始按钮
            ctx.fillStyle = 'rgb(250, 250, 250)';
            ctx.font = '24px Helvetica';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('开始游戏', canvas.canvas.width / 3, canvas.canvas.height / 5);
            // 音乐开关
            ctx.fillStyle = 'rgb(250, 250, 250)';
            ctx.font = '24px Helvetica';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('音乐on/off', canvas.canvas.width / 3, canvas.canvas.height / 5 * 2);

            // 查看排行榜
            ctx.fillStyle = 'rgb(250, 250, 250)';
            ctx.font = '24px Helvetica';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('英雄榜', canvas.canvas.width / 3, canvas.canvas.height / 5 * 3);
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

        init: function (callback) {
            var me = this;
            this.layout();
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

            canvas.canvas.addEventListener('click', function (e) {
                // console.log("屏幕试图高"+window.document.body.clientHeight);
                // console.log('上边界是'+beginTop);
                // console.log('下边界是'+beginBottom);
                if (e.x < commonRight && e.x > commonLeft) {
                    if (e.y < beginBottom && e.y > beginTop) {
                        console.log("点击了开始游戏");
                        callback();
                    }
                    else if (e.y < musicBottom && e.y > musicTop) {
                        console.log('点击了背景音乐');
                        me.bgToggle();
                    }
                    else if (e.y < heroBottom && e.y > heroTop) {
                        console.log("点击了排行榜");
                    }
                }

            });
            // this.elm.class = 'image';
            // this.elm.obj = resource.list.cat;
            // this.elm.x = 10;
            // this.elm.y = canvas.height - 70;
            // this.elm.width = 60;
            // this.elm.height = 60;
        }

    };
    return home;
});