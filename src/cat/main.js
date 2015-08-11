/**
 * @file cat/main.js
 * @author lidianbin
 */
define(function (require) {
    var canvas = require('canvas/main');
    var config = require('config/main');
    var resource = require('resource/main');

    var cat = {
        elm: {
            'class': 'image',
            'obj': null,
            'x': 10,
            'y': 10,
            'width': 60,
            'height': 60
        },
        reset: function () {

        },
        speed: 200,
        // direction: 'none',
        move: function (t) {
            // console.log(this.direction);
            if (canvas.direction === 'left') {
                this.elm.x -= t * this.speed;
                if (this.elm.x < 0) {
                    this.elm.x = 0;
                }
            }
            else if (canvas.direction === 'right') {
                this.elm.x += t * this.speed;
                if (this.elm.x > canvas.width - this.elm.width) {
                    this.elm.x = canvas.width - this.elm.width;
                }
            }
            else {

            }
        },
        init: function () {
            this.elm.class = 'image';
            this.elm.obj = resource.list.cat;
            this.elm.x = 10;
            this.elm.y = canvas.height - 70;
            this.elm.width = 60;
            this.elm.height = 60;
        }

    };
    return cat;
});