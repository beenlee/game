/**
 * @file 游戏中的暂停和继续
 * @author zhouqinghuai@baidu.com
 */

define(function (require, exports) {
    var conf = require('config/main');
    //var selectContinue = require('continue/main');

    var handle = {
        canvasHandle: null, // 画布的dom
        context: null, // 画布的ctx
        status: 'play', // pause
        begin: null,
        end: null,
        init: function (pauseCB, continueCB) {
            this.canvasHandle = document.createElement('canvas');
            this.canvasHandle.width = 25;
            this.canvasHandle.height = 30;
            this.canvasHandle.id = 'handle';

            this.canvasHandle.style.position = 'absolute';
            this.canvasHandle.style.left = 140 + 'px';
            this.canvasHandle.style.top = 30 + 'px';
            // this.canvasPause.style.background = '#ccc';
            document.body.appendChild(this.canvasHandle);
            this.context = this.canvasHandle.getContext('2d');

            this.drawContinue();

            this.canvasHandle.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.context.clearRect(0, 0, 25, 30);

                if(this.status === 'play') {
                    this.drawPause();
                    this.status = 'pause';
                    typeof pauseCB === 'function' && pauseCB();
                    this.begin = Date.now();
                }
                else {
                    this.drawContinue();
                    this.status = 'play';
                    typeof continueCB === 'function' && continueCB();
                    this.end = Date.now();
                }
            }.bind(this), false);
        },

        drawPause: function () {
           
            this.context.beginPath();
            this.context.fillStyle = "#000";
            this.context.moveTo(0, 0);
            this.context.lineTo(0, 30);
            this.context.lineTo(25, 15);
            this.context.closePath();
            this.context.fill();

        },

        drawContinue: function () {
            
            this.context.fillStyle = '#000';
            this.context.fillRect(0, 0, 10, 30);
            this.context.fillRect(15, 0, 10, 30);
        },
        dispose: function () {
            this.context.clearRect(0, 0, 25, 30);
        }

    };
    return handle;
});