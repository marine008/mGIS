/**
 * 地图Logo控件
 */
L.MapLogo =  L.Control.extend({
    options: {},

    intialize:function (options) {
        L.setOptions(this, options);
    },

    onAdd: function () {
        this._container = L.DomUtil.create('div', 'marine-maplogo');
        return this._container;
    },

    _setTileJSON:function (json) {
        if(json.marine_logo){
            L.DomUtil.addClass(this._container, 'marine-maplogo-true');
        }
    }

});

L.maplogo = function (options) {
    return new L.MapLogo(options);
}

