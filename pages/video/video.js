// pages/video/video.js
Page({
  data:{
    videoList:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    wx.request({
      url:'https://newapi.meipai.com/output/channels_topics_timeline.json?id=1',
      success:function(res){
        console.log(res.data)
        that.setData({
          videoList:res.data
        })
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