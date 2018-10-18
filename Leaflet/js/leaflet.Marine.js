import {mapLogo} from './leaflet.MapLogo.js';
import L from './leaflet.js';
/**
 * Marine自定义地图控件，设定相关的配置
 * @type {void|*}
 */
var Marine = L.Map.extend({
    options:{
        displayLogo: true,
    },

    // 初始化设置地图，设定地图logo
    initialize: function (el, options) {
        L.setOptions(this, options);
        options.attributionControl = false;

        L.Map.prototype.initialize.call(this, el,
            L.extend({}, L.Map.prototype.options, options));

        if(this.options.displayLogo === true){
            this._logoControl = mapLogo(options);
            this.addControl(this._logoControl);
        }
    }
});

export var marine = function (el, options) {
    return new Marine(el, options);
};