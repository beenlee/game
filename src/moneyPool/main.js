/**
 * @file moneyPool/main.js
 * @author lidianbin
 */
define(function (require, exports) {
    var resource = require('resource/main');
    var canvas = require('canvas/main');
    function Money() {
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

    var moneyPool = {
        size: 4,
        pool: [],

        init: function () {
            for (var i = 0; i < this.size; i++) {
                var money = new Money();
                money.init();
                this.pool[i] = money;
            }
        },
        get: function () {
            for (var i = this.size - 1; i >= 0; i--) {
                if (!this.pool[i].inUse) {
                    this.pool[i].spawn();
                    return this.pool[i];
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
