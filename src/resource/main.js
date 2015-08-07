/**
 * @file resource/main.js
 * @author lidianbin
 */
define(function (require) {

    var conf = require('config/main');
    var resource = {

        list: {},
        init: function (callback) {

            var loadList = conf.RSList;
            var loadRs = function (loadList, index, callback) {

                if (this.list.hasOwnProperty(loadList[index].name)) {

                    if (!(this.list[loadList[index].name] instanceof Array)) {
                        this.list[loadList[index].name] = [this.list[loadList[index].name]];
                    }
                    var tmpImg = new Image();
                    this.list[loadList[index].name].push(tmpImg);
                    tmpImg.src = loadList[index].src;
                    tmpImg.onload = function () {
                        if (loadList[++index]) {
                            loadRs(loadList, index, callback);
                        }
                        else {
                            callback();
                        }
                    }.bind(this);
                }
                else {
                    this.list[loadList[index].name] = new Image();
                    this.list[loadList[index].name].src = loadList[index].src;
                    this.list[loadList[index].name].onload = function () {
                        if (loadList[++index]) {
                            loadRs(loadList, index, callback);
                        }
                        else {
                            callback();
                        }
                    }.bind(this);
                }
            }.bind(this);
            loadRs(loadList, 0, callback);

        }
    };
    return resource;
});
