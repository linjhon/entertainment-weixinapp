//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    windowWidth:'',
    motto: 'Hello World',
    userInfo: {},
    song_list:[],
    movieList:[],
    videoList:[]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        // success
        console.log(res);
        that.setData({
          windowWidth:res.windowWidth,
          scrollHeight: res.windowHeight - 44
        })
      }
    })

    //请求歌曲
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList',
      data: {
        type: 1,
        size: 6,
        offset: 0
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data.song_list)
        that.setData({
          song_list: res.data.song_list
        })
        console.log('请求歌曲列表成功', that.data.song_list)
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

    //请求电影列表；
    wx.request({
      url: 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=6',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.data.movies)
        var movies=res.data.data.movies;
        that.setData({
          movieList:movies
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

    //请求视频列表;
    wx.request({
      url:'https://newapi.meipai.com/output/channels_topics_timeline.json?id=1&limit=6',
      success:function(res){
        console.log(res.data)
        var video=[];
        for(var i=0;i<6;i++){
          video[i]=res.data[i]
        }
        that.setData({
          videoList:video
        })
      }
    })
  },
  onPlay: function () {
    
  }
})
