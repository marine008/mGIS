/**
 * WGS84ToGCJ02
 * WGS84坐标系转GCJ02坐标系
 *
 * 参考文章：
 * https://blog.genglinxiao.com/%E5%85%B3%E4%BA%8E%E5%9C%B0%E5%9B%BE%E5%9D%90%E6%A0%87%E5%81%8F%E7%A7%BB/
 * https://archive.codeplex.com/?p=on4wp7#353936
 * https://blog.csdn.net/coolypf/article/details/8686588
 * https://wuyongzheng.wordpress.com/2010/01/22/china-map-deviation-as-a-regression-problem/
 * http://wuyongzheng.github.io/china-map-deviation/paper.html
 *
 * GCJ-02坐标系，椭球体：Krasovsky 1940
 * a=6378245.0, 1/f = 298.3
 * b = a * (1 - f)
 * ee = (a^2 - b^2) / a^2
 *
 */

const a = 6378245.0;
const ee = 0.00669342162296594323;
const x_PI = 3.14159265358979324 * 3000.0 / 180.0;
const PI = 3.1415926535897932384626;

/**
 * 判断是否在中国区范围，只有在该范围内的才做转换
 * @param lat
 * @param lon
 * @returns {boolean}
 */
function outOfChina(lat, lon) {
    if(lon < 72.004 || lon > 137.8347){
        return true;
    }
    if(lat < 0.8293 || lat > 55.8271){
        return true;
    }
    return false;
}

/**
 * 转换纬度数值
 * @param x
 * @param y
 */
function transformLat(x, y) {
    var latResult = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    latResult += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
    latResult += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
    latResult += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
    return latResult;
}

/**
 * 转换经度信息
 * @param x
 * @param y
 * @returns {*}
 */
function transformLon(x, y) {
    var lonResult = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    lonResult += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
    lonResult += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
    lonResult += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
    return lonResult;
}

/**
 * 坐标转换
 * @param lat
 * @param lon
 * @returns {[null,null]}
 */
function transform(lat, lon) {
    var rLat, rLon, dLat, dLon, radLat, magic;
    dLat = transformLat(lon - 105.0, lat - 35.0);
    dLon = transformLon(lon - 105.0, lat - 35.0);
    radLat = lat / 180.0 * PI;
    magic = Math.sin(radLat);
    magic = 1- ee * magic * magic;
    dLat = (dLat * 180.0) / ((a * (1 - ee))) / (magic * Math.sqrt(magic));
    dLon = (dLon * 180.0) / (a / Math.sqrt(magic) * Math.cos(radLat) * PI);
    rLat = lat + dLat;
    rLon = lon + dLon;
    return [rLat, rLon];
}

/**
 * WGS84坐标系转换为GCJ02火星坐标系
 * @param wgLat
 * @param wgLon
 * @returns {[null,null]}
 */
function wgs84ToGCJ02(wgLat, wgLon) {
    if(outOfChina(wgLat, wgLon)){
        return [wgLat, wgLon];
    }
    return transform(wgLat, wgLon);
}

/**
 * 百度09坐标系转换为GCJ02坐标系
 * @param bdLat
 * @param bdLon
 * @returns {[null,null]}
 */
function bd09ToGCJ02(bdLat, bdLon) {
    var z, theta, mgLat, mgLon;
    bdLat = bdLat - 0.006;
    bdLon = bdLon - 0.0065;
    z = Math.sqrt(bdLon * bdLon + bdLat * bdLat) - 0.00002 * Math.sin(bdLat * x_PI);
    theta = Math.atan2(bdLat, bdLon) - 0.000003 * Math.cos(bdLon * x_PI);
    mgLat = z * Math.sin(theta);
    mgLon = z * Math.cos(theta);
    return [mgLat, mgLon];
}

/**
 * GCJ02火星坐标系转换为WGS84坐标系
 * @param mgLat
 * @param mgLon
 * @returns {[null,null]}
 */
function gcj02ToWGS84(mgLat, mgLon) {
    var result, tLat, tLon;
    if(outOfChina(mgLat, mgLon)){
        return [mgLat, mgLon];
    }
    result = transform(mgLat, mgLon);
    tLat = result[0];
    tLon = result[1];
    return [mgLat * 2 - tLat, mgLon * 2 - tLon];
}

/**
 * GCJ02坐标系转换为百度09坐标系
 * @param mgLat
 * @param mgLon
 * @returns {[null,null]}
 */
function gcj02ToBD09(mgLat, mgLon) {
    var z, theta, bdLat, bdLon;
    z = Math.sqrt(mgLon * mgLon + mgLat * mgLat) + 0.00002 * Math.sin(mgLat * x_PI);
    theta = Math.atan2(mgLat, mgLon) + 0.000003 * Math.cos(mgLon * x_PI);
    bdLon = z * Math.cos(theta) + 0.0065;
    bdLat = z * Math.sin(theta) + 0.006;
    return [bdLat, bdLon];
}

/**
 * 百度09坐标系转换为WGS84坐标系
 * @param bdLat
 * @param bdLon
 * @returns {(null|null)[]}
 */
function bd09ToWGS84(bdLat, bdLon) {
    var result, mgLat, mgLon;
    result = bd09ToGCJ02(bdLat, bdLon);
    mgLat = result[0];
    mgLon = result[1];
    return gcj02ToWGS84(mgLat, mgLon);
}

/**
 * WGS84坐标系转百度09坐标系
 * @param wgLat
 * @param wgLon
 * @returns {(null|null)[]}
 */
function wgs84ToBD09(wgLat, wgLon) {
    var result, mgLat, mgLon;
    result = wgs84ToGCJ02(wgLat, wgLon);
    mgLat = result[0];
    mgLon = result[1];
    return gcj02ToBD09(mgLat, mgLon);
}