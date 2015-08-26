/**
 * @file config/mian.js
 * @author lidianbin
 */


define(function (require) {
    console.log('load config!');
    //console.log(window.location);
    var Configure = function () {
        // var conf = require("text!config/config.json");
        // this.config =  JSON.parse(conf);
        this.RSList = [
            {src: 'src/cat/img/cat.png', name: 'cat'},
            {src: 'src/moneyPool/img/money-0.png', name: 'money'},
            {src: 'src/moneyPool/img//money-1.png', name: 'money'},
            {src: 'src/moneyPool/img/money-2.png', name: 'money'},
            {src: 'src/moneyPool/img/shit.png', name: 'shit'}
        ];
        this.sys = {
            gameTime: 60, //游戏时长
            dropObjCount: 4 //下落物数量
        };


    };
    return new Configure();
});
