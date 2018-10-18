/**
 * 地图Logo控件
 */
import L from './leaflet.js';

var MapLogo =  L.Control.extend({
    options: {
        position: 'bottomleft'
    },

    initialize:function (options) {
        L.setOptions(this, options);
    },

    onAdd: function () {
        this._container = L.DomUtil.create('div', 'marine-maplogo');
        L.DomUtil.addClass(this._container, 'marine-maplogo-true');
        return this._container;
    },
});

export var mapLogo = function (options) {
    return new MapLogo(options);
}

