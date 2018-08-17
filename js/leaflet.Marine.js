/**
 * Marine自定义地图控件，设定相关的配置
 * @type {void|*}
 */
L.Marine.Map = (L.map ? L.map: L.Class).extend({
    options:{
        displayLogo: true,
    },

    // 初始化设置地图，设定地图logo
    initialize: function (options) {
        options.attributionControl = false;

    }
});

L.marine.map = function (options) {
    return new L.Marine.Map(options);
};