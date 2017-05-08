// pages/ticket/ticket.js
Page({
  data:{
    cinema:'',
    date:''
  },
  onLoad:function(options){
    var that=this;
      var movieid=options.movieid;
      var cinemaid=options.cinemaid;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'https://m.maoyan.com/showtime/wrap.json',
      data: {
        cinemaid:cinemaid,
        movieid:movieid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.data);
        var data=res.data.data;
        var date=data.Dates[0];
        that.setData({
          cinema:data,
          currentDate:date //默认显示时间;
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})