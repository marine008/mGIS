/**
 * Marine自定义地图控件，设定相关的配置
 * @type {void|*}
 */
L.Marine = L.Map.extend({
    options:{
        displayLogo: true,
    },

    // 初始化设置地图，设定地图logo
    initialize: function (el, options) {
        L.setOptions(this, options);
        options.attributionControl = false;

        L.Map.prototype.initialize.call(this, el,
            L.extend({}, L.Map.prototype.options, options));
    },

    // 绘制logo MarineLogoControl
    drawLogo: function () {

    }
});

L.marine = function (el, options) {
    return new L.Marine(el, options);
};