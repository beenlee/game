/**
 * @file resource/main.js
 * @author lidianbin
 */
define(function (require) {

    var conf = require('config/main');

    var Promise = function () {
        this.doneList = [];
        this.failList = [];
        this.param = null;
        this.state = 'pending';
    };

    Promise.prototype.resolve = function (value) {
        this.state = 'resolved';
        var list = this.doneList;
        for (var i = 0, len = list.length; i < len; i++) {
            this.param = value;
            list[0].call(this, value);
            list.shift();
        }
    };

    Promise.prototype.reject = function (error) {
        this.state = 'rejected';
        var list = this.failList;
        for (var i = 0, len = list.length; i < len; i++) {
            list[0].call(this, error);
            list.shift();
        }
    };

    Promise.prototype.done = function (fun) {
        if (typeof fun === 'function') {
            this.doneList.push(fun);
        }
        return this;
    };

    Promise.prototype.fail = function (fun) {
        if (typeof fun === 'function') {
            this.failList.push(fun);
        }
        return this;
    };

    Promise.prototype.then = function (onResolved, onRejected) {
        this.done(onResolved).fail(onRejected);
        return this;
    };

    Promise.prototype.always = function (fun) {
        this.done(fun).fail(fun);
        return this;
    };

    Promise.when = function () {
        var p = new Promise();
        var success = true;
        var promiseList = arguments;
        var len = promiseList.length;
        var fun = function () {
            if (this.state !== 'resolved') {
                success = false;
            }
            len--;
            if (len === 0) {
                var params;
                for (var i = 0, l = promiseList.length; i < l; i++) {
                    if (promiseList[i].param !== undefined) {
                        params !== undefined || (params = []);
                        params.push(promiseList[i].param);
                    }
                }
                success ? p.resolve(params) : p.reject();
            }
        };
        for (var i = 0; i < len; i++) {
            if (!(arguments[i] instanceof Promise)) {
                return false;
            }
            arguments[i].always(fun);
        }
        return p;
    };

    var resource = {

        list: {},
        init: function (callback) {

            var start = new Date();
            var loadList = conf.RSList;

            // 回调
            // var loadRs = function (loadList, index, callback) {
            //     var tmpImg = new Image();
            //     tmpImg.src = loadList[index].src;
            //     tmpImg.onload = function () {
            //         if (loadList[++index]) {
            //             loadRs(loadList, index, callback);
            //         }
            //         else {
            //             var end = new Date();
            //             console.log(end - start);
            //             callback();
            //         }
            //     };
            //     if (this.list.hasOwnProperty(loadList[index].name)) {
            //         if (!(this.list[loadList[index].name] instanceof Array)) {
            //             this.list[loadList[index].name] = [this.list[loadList[index].name]];
            //         }
            //         this.list[loadList[index].name].push(tmpImg);
            //     }
            //     else {
            //         this.list[loadList[index].name] = tmpImg;
            //     }
            // }.bind(this);
            // loadRs(loadList, 0, callback);

            // promise
            var promiseList = [];
            var loadRs = function (i) {
                // 生成promise对像
                var promise = new Promise();
                promiseList.push(promise);

                // 使用Image对象加载图片
                var tmpImg = new Image();
                tmpImg.src = loadList[i].src;

                tmpImg.onload = function (e) {
                    promise.resolve();
                };

                // 把加载的图片放入资源列表中
                if (this.list.hasOwnProperty(loadList[i].name)) {
                    if (!(this.list[loadList[i].name] instanceof Array)) {
                        this.list[loadList[i].name] = [this.list[loadList[i].name]];
                    }
                    this.list[loadList[i].name].push(tmpImg);
                }
                else {
                    this.list[loadList[i].name] = tmpImg;
                }
            }.bind(this);
            for (var i = 0, len = loadList.length; i < len; loadRs(i++)) {}
            Promise.when.apply(Promise, promiseList).done(function (params) {
                // console.log(params);
                var end = new Date();
                // console.log(end - start);
                callback();
            }).fail(function () {
                console.log('资源加载失败！');
            });
        }
    };

    return resource;
});
