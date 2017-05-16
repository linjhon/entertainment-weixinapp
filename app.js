//app.js
App({
    onLaunch: function () {
        var unNetwork = this.globalData.unNetwork
        this.globalData.unNetwork = wx.getStorageSync('unNetwork') || unNetwork;
        ;
        if (this.globalData.unNetwork == 'ok') {
            wx.onNetworkStatusChange(function (res) {
                console.log(res.isConnected)
                console.log(res.networkType)
                if (res.networkType != "wifi") {
                    wx.showModal({
                        title: '温馨提示',
                        content: '检测到您现在使用的并不是wifi，请留意您的流量,确认将不再提示，土豪请无视！',
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                wx.setStorageSync('unNetwork', 'un')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
            })
        }


        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        console.log(1)
    },

    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    onLoad: function () {

    },
    globalData: {
        userInfo: null,
        unNetwork: 'ok',
        videoCount: 0,
        musicCount: 0,
        movieCount: 0,
        movieList:{}
    }
})