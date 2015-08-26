/**
 * @file canvas/main.js
 * @author lidianbin
 */
define(function (require) {

    var canvasObj = {
        direction: 'none',
        init: function () {
            var bodyW = document.body.clientWidth;
            var bodyH = document.body.clientHeight;
            var canvas = this.canvas = document.createElement('canvas');
            this.ctx = canvas.getContext('2d');

            canvas.width = 320;
            canvas.height = 320 * bodyH / bodyW;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.background = 'green';
            document.body.appendChild(canvas);

            canvas.addEventListener(eStart, function (e) {
                // console.log(window);
                // console.log(e);
                // console.log(e.touches[0].pageX ,'<', document.body.clientWidth / 2 );
                e.preventDefault();
                e.stopPropagation();
                var evt = e.touches ? e.touches[0] : e;
                if (evt.pageX < document.body.clientWidth / 2 ) {
                    this.direction = 'left';
                }
                else {
                    this.direction = 'right';
                }

            }.bind(this), false);

            canvas.addEventListener(eMove, function (e) {
                console.log(e);
                e.preventDefault();
                e.stopPropagation();

                var evt = e.touches ? e.touches[0] : e;
                if (evt.pageX < (document.body.clientWidth / 2)) {
                    this.direction = 'left';
                }
                else {
                    this.direction = 'right';
                }
            }.bind(this), false);
            canvas.addEventListener(eEnd, function (e) {
                // console.log(e);
                e.preventDefault();
                e.stopPropagation();

                this.direction = 'none';
            }.bind(this), false);
        },

        get width() {
            return this.canvas.width;
        },
        set width(val) {
            this.canvas.width = val;
        },

        get height() {
            return this.canvas.height;
        },
        set height(val) {
            this.canvas.height = val;
        },
        getContext2d: function () {
            return this.ctx;
        }


    };
    return canvasObj;
})
;