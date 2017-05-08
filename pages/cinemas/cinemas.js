// pages/cinemas/cinemas.js

var qqMap = require('../../public/lib/qqmap-wx-jssdk.js');

var demo = new qqMap({
  key: 'XK2BZ-E3SAG-U6IQ3-IYDFM-DV5DF-QTBPT' // 必填
});

Page({
  data: {
    movieId: '',
    district: ''
  },
  onLoad: function (options) {
    var that = this;
    var latitude, longitude;
    // 获取位置
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     latitude = res.latitude
    //     longitude = res.longitude
    //     //解析经纬度为详细地址;
    //     demo.reverseGeocoder({
    //       location: {
    //         latitude: latitude,
    //         longitude: longitude
    //       },
    //       success: function (res) {
    //         console.log('微信详细地址', res);
    //         that.setData({
    //           district: res.result.district
    //         })
    //       },
    //       fail: function (res) {
    //         console.log(res);
    //       },
    //       complete: function (res) {
    //         console.log(res);
    //       }
    //     });
    //   },
    //   fail: function (res) {
    //     console.log('调动位置失败', res)
    //   }
    // })

    demo.reverseGeocoder({
      location: {
        latitude: 30.311916,
        longitude: 120.26624
      },
      success: function (res) {
        console.log('自定义详细地址', res);
        var currentDistrict=res.result.address_component.district
        that.setData({
          district: currentDistrict
        })
        wx.request({
          url: 'https://m.maoyan.com/cinemas.json',
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            // success
            var cinemasList=res.data.data[currentDistrict];
            console.log(currentDistrict)
            console.log('附近影院列表', res.data.data[currentDistrict])
            that.setData({
              cinemasList:cinemasList
            })
          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });



    //页面初始化 options为页面跳转所带来的参数  
    this.setData({
      movieId: options.id,
      latitude: latitude,
      longitude, longitude
    })

    // 请求影院列表;
    wx.request({
      url: 'https://m.maoyan.com/cinemas.json',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log('影院信息', res.data.data)
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
    wx.stopPullDownRefresh()
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh:function(){
    this.onLoad()
  }
})