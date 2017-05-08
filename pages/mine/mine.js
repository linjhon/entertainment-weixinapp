// pages/mine/mine.js
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hiddenLogs: false,
    videoCount: app.globalData.videoCount,
    musicCount: app.globalData.musicCount,
    movieCount: app.globalData.movieCount
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      hiddenLogs: wx.getStorageSync('hiddenLogs')
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.setData({
      videoCount: app.globalData.videoCount,
      musicCount: app.globalData.musicCount,
      movieCount: app.globalData.movieCount
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onSetting: function () {
    wx.openSetting({
      success: function (res) {
        console.log(res)
        res.authSetting = {
          "scope.userInfo": true,
          "scope.userLocation": true,
          "scope.record":true,
          "scope.address":true
        }
      }
    })
    this.setData({
      hiddenLogs: true
    })
    wx.setStorageSync('hiddenLogs', true)
  },
  clearStorge: function () {
    wx.showModal({
      title: '清除本地缓存',
      content: '您确定要清除缓存吗，这会将您的播放记录删除！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.clearStorageSync()
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})