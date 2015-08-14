/**
 * @file 游戏主模块
 * @author lidianbin
 */
define(function (require, exports) {
	window.requestAnimationFrame
        || (window.requestAnimationFrame
            = window.webkitRequestAnimationFrame
                || window.msRequestAnimationFrame
                || window.mozRequestAnimationFrame
        );
    var isTouch = 'ontouchstart' in window;
    window.eStart = isTouch ? 'touchstart' : 'mousedown';
    window.eMove = isTouch ? 'touchmove' : 'mousemove';
    window.eEnd = isTouch ? 'touchend' : 'mouseup';
    window.eCancel = isTouch ? 'touchcancel' : 'mouseup';

    // var conf = require('config/main');
    var moneyPool = require('moneyPool/main');
    var cat = require('cat/main');
    var canvas = require('canvas/main');
    var config = require('config/main');
    var home = require('home/main');
    /**
     * init
     *
     */
    exports.init = function () {

        this.status = 'home';
        this.then = null;
        this.start = null;
        this.score = 0;
        this.activeMoney = [];
        this.gameTime = config.sys.gameTime;
        this.remainingTime = config.sys.gameTime;
        canvas.init();

        require('resource/main').init(function () {
            this.home(function () {
                this.reset();
                this.start = this.then = Date.now();
                moneyPool.init();
                cat.init();
                this.mainLoop();
            }.bind(this));
        }.bind(this));

    };

    /**
     * 游戏的loop
     *
     *
     */
    exports.mainLoop = function () {
        if (this.status === 'play') {
            this.play();
        }
        else if (this.status === 'gameover') {
            this.gameover();
        }
        else if (this.status === 'home') {
            this.home();
        }
    };

    exports.reset = function () {
        this.status = 'play';
        this.then = null;
        this.start = null;
        this.score = 0;
        this.activeMoney = [];
        this.gameTime = config.sys.gameTime;
    };

    /**
     * 游戏首页
     *
     */
    exports.home = function (callback) {
        home.init(callback);
    };

    /**
     * 游戏结束
     *
     */
    exports.gameover = function () {
        console.log('game over!!');
        console.log('得分：' + this.score);
    };

    /**
     * 更新各种对象
     *
     */
    exports.update= function (modifier) {
        // console.log(modifier);
        var now = Date.now();
        // console.log(Math.floor(now / 1000) + '---' + Math.floor(then / 1000));
        if (Math.floor(now / 1000) !== Math.floor(this.then / 1000)) {

            var dropObjCount = config.sys.dropObjCount;
            if (this.activeMoney.length < dropObjCount) {
                var money = moneyPool.get();
                if (money) {
                    this.activeMoney.push(money);
                }
            }
        }
        // cat 走动
        cat.move(modifier);

        var tmpMoney = [];
        var len = this.activeMoney.length;
        // console.log(activeMoney);
        for (var i = 0; i < len; i++) {
            // 下落
            this.activeMoney[i].elm.y += modifier * this.activeMoney[i].speed;
            if (
                this.activeMoney[i].elm.x + this.activeMoney[i].elm.width >= cat.elm.x
                && this.activeMoney[i].elm.x <= cat.elm.x + cat.elm.width
                && this.activeMoney[i].elm.y + this.activeMoney[i].elm.height > cat.elm.y
                && this.activeMoney[i].elm.y <= cat.elm.y + cat.elm.height
            ) {
                this.activeMoney[i].clear();
                this.score += this.activeMoney[i].fun;
            }
            else if (this.activeMoney[i].elm.y > canvas.height) {
                this.activeMoney[i].clear();
            }
            else {
                tmpMoney.push(this.activeMoney[i]);
            }
        }
        
        this.activeMoney = tmpMoney;
    };

    /**
     * 开始玩游戏
     *
     */
    exports.play = function () {

        var now  = Date.now();
        var delta = now - this.then;
        
        var t = Math.floor((this.then - this.start) / 1000);
        this.remainingTime = this.gameTime - t;
        if (this.remainingTime < 0) {
            this.status = 'gameover';
            this.remainingTime = 0;
        }
        this.update(delta / 1000);
        this.render();
        this.then = now;
        
        requestAnimationFrame(this.mainLoop.bind(this));
    };

    /**
     * 渲染画布
     *
     */
    exports.render = function () {
        // 画背景
        var ctx = canvas.getContext2d();
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fill();

        // 画主要场景
        var catElm = cat.elm;
        // ctx.beginPath();
        // ctx.lineWidth = '6';
        // ctx.strokeStyle = 'red';
        // ctx.rect(catElm.x, catElm.y, catElm.width, catElm.height);
        // ctx.stroke();
        ctx.drawImage(catElm.obj, catElm.x, catElm.y, catElm.width, catElm.height);

        for (var i = 0; i < this.activeMoney.length; i++) {

            ctx.drawImage(
                this.activeMoney[i].elm.obj,
                this.activeMoney[i].elm.x, this.activeMoney[i].elm.y,
                this.activeMoney[i].elm.width, this.activeMoney[i].elm.height
            );
        }

        // 画得分
        ctx.fillStyle = 'rgb(250, 250, 250)';
        ctx.font = '24px Helvetica';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('得分: ' + this.score, 32, 32);

        // 画时间
        ctx.fillStyle = 'rgb(250, 250, 250)';
        ctx.font = '24px Helvetica';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('时间: ' + this.remainingTime, 200, 32);

    };

});
