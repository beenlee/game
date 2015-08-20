/**
 * @file background
 * @author lidianbin
 */
define(function (require) {
    var config = require('config/main');
    var resource = require('resource/main');
    //var ctx = canvas.getBContext2d();
    
    var background = {
        init: function () {
            var canvasObj = require('canvas/main');
            var canvas = canvasObj.getBCanvas();
            console.log('init background');
            console.log(resource.list.bg);
            console.log(resource.list.bg.getAttribute('src'));
            canvas.style.backgroundImage = 'url(' + resource.list.bg.getAttribute('src') + ')';
            canvas.style.backgroundSize = '100% 100%';
            /*
            this.elm.class = 'image';
            this.elm.obj = resource.list.cat;
            this.elm.x = 10;
            this.elm.y = canvas.height - 70;
            this.elm.width = 60;
            this.elm.height = 60;
            */
        }

    };
    return background;
});