//--------------------微信小程序开发--------------------------

//(1)官方文档：https://developers.weixin.qq.com/miniprogram/dev/

//(2)2016年1月，张小龙宣布正在研发小程序，这个功能允许商家和第三方开发者在微信里面运行自己的应用程序，完成一些特殊功能，比如点餐和购物，用户不用额外安装。

//(3)2017年1月，小程序的开发指南和 API 正式发布。

//(4)2017年12月，微信正式推出小游戏，它属于小程序的一个类别。同时发布了一个小游戏"跳一跳"作为演示，这个游戏的日活跃用户达到1亿。

//(5)2018年6月，微信小程序数量超过100万，用户超过6亿。小程序将最终使得微信成为一个生态体系，其中可以进行各种各样的业务，为腾讯创造出无数的商业可能。

//(6)微信小程序开发与网页编程的异同
//---页面的结构：网页编程采用HTML，小程序采用WXML，将很多常用的组件进行了封装
//---页面的样式：网页编程采用CSS，小程序采用WXSS，使用了新的尺寸单位 rpx
//---页面的逻辑：都采用js控制，小程序固定采用MVVM的开发模式，使用特殊标记 wx:

//(7)微信小程序的项目结构
//---根目录（注意这些名称是固定的，以便微信客户端能识别小程序的代码）
"project.config.json";//开发工具配置
"app.json";//小程序的全局配置。包含小程序的所有页面路径、界面表现、网络超时时间、底部 tab 
"app.js";//小程序逻辑
"app.wxss";//小程序的全局样式
//---每个小程序页面的结构（注意每个页面的这几个文件名称要统一，以减少配置项）
"page.json";//页面配置
"page.js";//页面逻辑
"page.wxml";//页面结构
"page.wxss";//页面样式表


//--------------------app.json------------------------

//(1)对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。具体的还是看官网
({
    "pages": ["pages/index/index", "pages/logs/index"],//页面路径列表。第一个也就是初始页面
    "window": {//全局的默认窗口表现
        "navigationBarTitleText": "Demo"
    },
    "tabBar": {//底部 tab 栏的表现
        "list": [
            {
                "pagePath": "pages/index/index",
                "text": "首页"
            },
            {
                "pagePath": "pages/logs/logs",
                "text": "日志"
            }
        ]
    },
    "networkTimeout": {//网络超时时间
        "request": 10000,
        "downloadFile": 10000
    },
    "debug": true,//是否开启debug模式，默认false
    "navigateToMiniProgramAppIdList": ["wxe5f52902cf4de896"]//需要跳转的小程序列表
})


//--------------------app.js------------------------

//(1)app.js中执行App()函数来注册一个小程序。参数为生命周期监测对象
App({
    globalData: 1,//在APP中设置全局数据
    onLaunch(options) {//小程序初始化，即启动
        options = wx.getLaunchOptionsSync()
    },
    onShow(options) { },//小程序显示
    onHide() { },//小程序隐藏
    onError(msg) { },//小程序发生错误
    onPageNotFound() { },//页面不存在
})
getApp();//这是全局函数，用于获取app实例，另外在App()方法中用this指代app实例。通过这个函数，页面可以得到app实例，从而得到其中的全局数据

//(2)小程序中有个场景值的概念，用于重新返回小程序时，能回到对应的场景。
//---可以在 App 的 onLaunch 和 onShow，或wx.getLaunchOptionsSync 中获取上述场景值。


//--------------------page.js-----------------------

//(1)page.js中执行Page()函数来注册一个小程序页面。
Page({
    data: {},//页面的初始数据
    onLoad() { },//页面加载，可以获取页面参数
    onShow() { },//页面显示
    onReady() { },//页面初次渲染完成
    onHide() { },//页面隐藏
    onUnload() { },//页面卸载
    onPullDownRefresh() { },//用户下拉刷新
    onReachBottom() { },//页面上拉触底
    onShareAppMessage() { },//用户点击右上角转发
    onPageScroll() { },//页面滚动
    onResize() { },//页面尺寸改变
    onTabitemTap() { },//点击tab时
})
Page.prototype.setData();//设置页面数据，而不是直接修改this.data

//(2)页面切换
wx.navigateTo({ url: 'pagePath?param=value' });//打开新页面（不能是tabBar页面）
//---等同于：<navigator open-type="navigateTo" url="pagePath?param=value"/>
wx.redirectTo({ url: 'pagePath?param=value' });//页面重定向（不能重定向到tabBar页面）
//---等同于：<navigator open-type="redirectTo" url="pagePath?param=value"/>
wx.navigateBack();//返回上个页面（不能返回tabBar页面）
//---等同于：<navigator open-type="navigateBack"/>
wx.tabSwitch();//切换tabBar页面
wx.reLaunch();//重启