// 面积测量方法
var areaMeasure = {
    points:[],
    color: "red",
    layers: L.layerGroup(),
    polygon: null,
    init:function(){
        areaMeasure.points = [];
        areaMeasure.polygon = null;
        map.on('click', areaMeasure.click).on('dblclick', areaMeasure.dblclick);
    },
    click:function(e){
        map.doubleClickZoom.disable();
        // 添加点信息
        areaMeasure.points.push(e.latlng);
        // 添加面
        map.on('mousemove', areaMeasure.mousemove);
    },
    mousemove:function(e){
        areaMeasure.points.push(e.latlng);
        if(areaMeasure.polygon)
            map.removeLayer(areaMeasure.polygon);
        areaMeasure.polygon = L.polygon(areaMeasure.points,{showMeasurements: true, color: 'red'});
        //areaMeasure.polygon.addTo(map);
        areaMeasure.polygon.addTo(areaMeasure.layers);
        areaMeasure.layers.addTo(map);
        areaMeasure.points.pop();
    },
    dblclick:function(e){ // 双击结束
        areaMeasure.polygon.addTo(areaMeasure.layers);
        areaMeasure.polygon.enableEdit();
        map.on('editable:vertex:drag editable:vertex:deleted', areaMeasure.polygon.updateMeasurements, areaMeasure.polygon);
        map.off('click', areaMeasure.click).off('mousemove', areaMeasure.mousemove).off('dblclick', areaMeasure.dblclick);
    },
    destory:function(){

    }
};

var lineMeasure = {
    points:[],
    color: "red",
    layers: L.layerGroup(),
    polyline: null,
    init:function(){
        lineMeasure.points = [];
        lineMeasure.polyline = null;
        map.on('click', lineMeasure.click).on('dblclick', lineMeasure.dblclick);
    },
    click:function(e){
        map.doubleClickZoom.disable();
        // 添加点信息
        lineMeasure.points.push(e.latlng);
        // 添加面
        map.on('mousemove', lineMeasure.mousemove);
    },
    mousemove:function(e){
        lineMeasure.points.push(e.latlng);
        if(lineMeasure.polyline)
            map.removeLayer(lineMeasure.polyline);
        lineMeasure.polyline = L.polyline(lineMeasure.points,{showMeasurements: true, color: 'red'});
        //areaMeasure.polygon.addTo(map);
        lineMeasure.polyline.addTo(lineMeasure.layers);
        lineMeasure.layers.addTo(map);
        lineMeasure.points.pop();
    },
    dblclick:function(e){ // 双击结束
        lineMeasure.polyline.addTo(lineMeasure.layers);
        lineMeasure.polyline.enableEdit();
        map.on('editable:vertex:drag editable:vertex:deleted', lineMeasure.polyline.updateMeasurements, lineMeasure.polyline);
        map.off('click', lineMeasure.click).off('mousemove', lineMeasure.mousemove).off('dblclick', lineMeasure.dblclick);
    },
    destory:function(){

    }
}