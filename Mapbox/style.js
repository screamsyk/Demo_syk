const style = {
    version: 8,// style 的版本号。必须为最新的 8
    name: 'Bright',// style 的名称。便于人称呼和分辨
    metadata: { 'mapbox:test': {} },// 放置用于追踪样式表的任意属性，但其中的属性名必须以 mapbox: 作为前缀，以免冲突
    center: [-73.9749, 40.7736],//数字数组，表示地图展示时的中心坐标（经纬度）
    zoom: 7.5,//数字，表示地图的缩放层级
    bearing: 45,//地图绕空间坐标系 x 轴的旋转角度
    pitch: 45,//地图绕空间坐标系 z 轴的旋转角度
    sprite: 'mapbox://sprites/mapbox/bright-v8',//一个加载小图片的地址模板，常用于渲染background-pattern, fill-pattern, line-pattern,fill-extrusion-pattern and icon-image时
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',//字形的地址模板
    transition: {//过渡效果
        duration: 300,
        delay: 0
    },
    light: {// 光源
        anchor: 'viewport',//光源的照射点，取值可为 map 或 viewport（即与地图还是视口的旋转方向一致）（感觉没太懂~v~）
        position: [1.5, 90, 80],//光源的位置[r,a,p]
        //---r:极坐标，物体底部到光源的距离
        //---a:方位角，光源相对于0度的位置（如果anchor为viewport，则0度指的是视口顶部的位置；如果是map，则0度指地图正北的方向，并且顺时针旋转）
        //---p:极角，光源的高度（0度以上，180度以下）
        color: '#fff',//光源照射时的颜色
        intensity: 0.27//光照强度
        //---Mapbox GL JS >= 0.27.0
        //---Android SDK >= 5.1.0
        //---iOS SDK >= 3.6.0
        //---macOS SDK >= 0.5.0
    },
    sources: {//提供要在地图上展示的数据，可以包含多种类型的source，但不包含各种样式属性
        'source1-name': {
            type: 'geojson',//数据源的类型，只能为 vector, raster, raster-dem, geojson, image, video 之一
        },
        'source2-name': {

        }
    },
    layers: [//包含多个layer，每个layer引用对应的一个数据源source，并给数据源source可视化的展示（所以相同的source，可以有不同的展示）
        {
            type: 'fill',//层的类型，只能为 background, fill, line, symbol, raster, circle, fill-extrusion, heatmap, hillshade 之一
            id: 'asdfasfasdf',//独一无二的层的id
            metadata: {},//类似 style.metadata
            source: 'source-name',//此图层用的数据源的描述名称
            'source-layer': '',//矢量切片数据源使用的图层，其他数据源禁止使用
        }
    ]
}