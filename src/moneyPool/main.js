/**
 * @file 下坠的物品的对象池
 * @author lidianbin
 */
define(function (require, exports) {
    var resource = require('resource/main');
    var canvas = require('canvas/main');
    
    /**
     * 下坠物的基类
     *
     */
    function DropObj() {
        this.inUse = false;
        this.elm = {
            'class': 'image',
            'obj': null,
            'x': 0,
            'y': 0,
            'width': 50,
            'height': 50
        };
        this.speed = 100;
        this.init = function () {
            this.elm.x = Math.random() * (canvas.width - this.elm.width);
            this.elm.y = 40;
            this.elm.obj = resource.list.money[Math.floor(Math.random() * 3)];
            this.speed = Math.random() * 100 + 50;
        };

        this.spawn = function () {
            this.inUse = true;
        };

        this.clear = function () {
            // this.elm.y = 0;
            this.inUse = false;
            this.init();
        };
    }
    
    /**
     * 坠落的钱
     *
     */
    function Money() {
        DropObj.call(this);
        this.init = function () {
            this.elm.x = Math.random() * (canvas.width - this.elm.width);
            this.elm.y = 40;
            this.elm.obj = resource.list.money[Math.floor(Math.random() * 3)];
            this.speed = Math.random() * 100 + 80;
            this.fun = 1;
        };
    }
    
    /**
     * 下坠的大便
     *
     */
    function Shit() {
        DropObj.call(this);
        this.init = function () {
            this.elm.x = Math.random() * (canvas.width - this.elm.width);
            this.elm.y = 40;
            this.elm.obj = resource.list.shit;
            this.fun = -2;
            this.speed = Math.random() * 100 + 80;
        };
    }

    var moneyPool = {
        size: 6,
        moneySize: 4,
        shitSize: 2,
        pool: [],

        init: function () {
            for (var i = 0, moneySize = this.moneySize; i < moneySize; i++) {
                var money = new Money();
                money.init();
                this.pool.push(money);
            }
            
            for (var j = 0, shitSize = this.shitSize; j < shitSize; j++) {
                var shit = new Shit();
                shit.init();
                this.pool.push(shit);
            }

        },
        get: function () {
            var index = Math.floor((Math.random() * this.size));
            for (var i = this.size - 1; i >= 0; i--, index = ++index % this.size) {
                if (!this.pool[index].inUse) {
                    this.pool[index].spawn();
                    return this.pool[index];
                }
            }
            return undefined;
        },
        reset: function () {
            this.pool = [];
        }
    };
    return moneyPool;
});
