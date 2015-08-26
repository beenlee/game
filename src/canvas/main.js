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
            this.canvasB = document.createElement('canvas');
            this.ctxB = this.canvasB.getContext('2d');
            this.canvasB.width = 320;
            this.canvasB.height = 320 * bodyH / bodyW;
            this.canvasB.style.width = '100%';
            this.canvasB.style.height = '100%';
            // this.canvasB.style.background = 'green';
            this.canvasB.style.position = 'absolute';
            document.body.appendChild(this.canvasB);

            this.canvasF = document.createElement('canvas');
            this.ctxF = this.canvasF.getContext('2d');
            this.canvasF.width = 320;
            this.canvasF.height = 320 * bodyH / bodyW;
            this.canvasF.style.width = '100%';
            this.canvasF.style.height = '100%';
            //canvasF.style.background = 'green';
            this.canvasF.style.position = 'absolute';
            this.canvasF.style.top = '0';
            this.canvasF.style.left = '0';
            document.body.appendChild(this.canvasF);

            this.canvasF.addEventListener(eStart, function (e) {
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

            this.canvasF.addEventListener(eMove, function (e) {
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
            this.canvasF.addEventListener(eEnd, function (e) {
                // console.log(e);
                e.preventDefault();
                e.stopPropagation();

                this.direction = 'none';
            }.bind(this), false);
        },

        get width() {
            return this.canvasF.width;
        },
        set width(val) {
            this.canvasF.width = val;
            this.canvasB.width = val;
        },

        get height() {
            return this.canvasF.height;
        },
        set height(val) {
            this.canvasB.height = val;
            this.canvasF.height = val;
        },
        getFContext2d: function () {
            return this.ctxF;
        },
        getBContext2d: function () {
            return this.ctxB;
        },
        getBCanvas: function () {
            return this.canvasB;
        },
        getFCanvas: function () {
            return this.canvasF;
        }


    };

    return canvasObj;
})
;