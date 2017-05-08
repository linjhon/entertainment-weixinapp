// pages/moviedetail/moviedetail.js
Page({
  data:{
    movie:{},
    despritionHeight:'height:62px;',
    gifPosition:{},
    videoShow:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.id)
    var that=this;
    wx.request({
      url: 'https://m.maoyan.com/movie/'+options.id+'.json',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.data)
        var movie=res.data.data.MovieDetailModel;
        for(var i=0;i<movie.photos.length;i++){
          movie.photos[i]=movie.photos[i].replace(/\/w\.h/g,'')
          console.log(movie.photos[i])
        }
        movie.dra=movie.dra.replace(/<[^>]*>/g,'')

        var comment=[]
        var dataComment=res.data.data.CommentResponseModel.hcmts
        for(var i=0;i<3;i++){
          comment[i]=dataComment[i]
        }

        that.setData({
          movie:movie,
          comment:comment,
          commentTotal:res.data.data.CommentResponseModel.total
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
  },
  onVideo:function(event){
    console.log(event)
    if(this.data.videoShow){
      //显示播放器
      this.videoAnimetion()
      this.setData({
        videoShow:false
      })
    }else{
      //隐藏播放器
      this.videoAnimetion(event.detail.x,event.detail.y)
      this.setData({
        videoShow:true
      })
    }
  },
  videoAnimetion:function(x,y){
    var videoGif=wx.createAnimation({
      duration: 400,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0',
      success: function(res) {
        console.log(res);
      }
    })
    if(!x){
      videoGif.width('100%').height(300).left(0).top(0).step()
    }else{
      videoGif.width(0).height(0).left(x).top(y).step()
    }
    this.setData({
      gifPosition:videoGif.export()
    })
  }
})