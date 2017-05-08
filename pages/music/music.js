// pages/music/music.js
function parseLyric(lrc) {
  var lyrics = lrc.split("\n");
  var lrcObj = {};
  for (var i = 0; i < lyrics.length; i++) {
    var lyric = decodeURIComponent(lyrics[i]);
    var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
    var timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr) continue;
    var clause = lyric.replace(timeReg, '');
    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
      var t = timeRegExpArr[k];
      var min = Number(String(t.match(/\[\d*/i)).slice(1)),
        sec = Number(String(t.match(/\:\d*/i)).slice(1));
      var time = min * 60 + sec;
      lrcObj[time] = clause;
    }
  }
  return lrcObj;
}

var musicLrc = {};

var app=getApp()

Page({
  data: {
    musicShow: true,//播放器是否显示;
    song_id: '',//当前播放歌曲id
    music: {},//当前播放歌曲
    song_list: [],//歌曲列表
    musicAnimation: {},//播放器出现动画;
    scrollHeight: '',
    musicSize: 20,
    musicOffset: 0,
    bstop: true,
    playerId: 0,
    playerSrc: '../../public/images/icons/musicplayer.png',
    playerLrc: '',
    playerAnimation: {},//播放器按钮动画
    play3g:true
  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    // var song_id=wx.getStorageSync('song_id')

    var playerId = wx.getStorageSync('playerId') || 0;
    this.setData({
      play3g:wx.getStorageSync('play3g')
    })
    console.log(wx.getStorageSync('playerId'))
    this.setData({
      playerId: playerId
    })
    this.addData(function (id) {
      // id=song_id || id
      that.playmusic(id);
      setTimeout(function () {
        that.showMusicPlay();
      }.bind(this), 500)
    });

    //滚动区域高度自适应
    wx.getSystemInfo({
      success: function (res) {
        // success
        console.log(res.screenHeight);
        that.setData({
          scrollHeight: res.screenHeight - 68 - 44
        })
      }
    })
    console.log(this.data.scrollHeight)
  },
  addData: function (fn) {
    console.log('请求歌曲中')

    var that = this;
    if (this.data.bstop) {
      this.setData({//不请求多次
        bstop: false
      })
      wx.request({
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList',
        data: {
          type: 1,
          size: that.data.musicSize,
          offset: that.data.musicOffset
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          console.log(res.data.song_list)
          that.setData({
            song_list: res.data.song_list,
            bstop: true
          })
          console.log('请求歌曲列表成功', that.data.song_list)
          var num = that.data.playerId
          var song_id = res.data.song_list[num].song_id;
          if (fn) {
            fn(song_id)
          }
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }
  },
  onMore: function () {
    if (this.data.bstop) {
      console.log('滑动到底部')
      this.setData({
        musicSize: this.data.musicSize + 20
      })
      this.addData();
    }
  },
  onReady: function () {
    this.audio = wx.createAudioContext('musicbox')
  },
  onShow: function () {
    // 页面显示    
  },
  onPullDownRefresh: function () {
    this.onLoading()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  playmusic: function (id, fn) {
    //加载歌曲播放地址;
    var that = this;
    wx.showLoading({
      title: "歌曲加载中"
    })
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play',
      data: { songid: id },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log("请求歌曲播放地址", res)
        var lrc = res.data.songinfo.lrclink;
        console.log('歌曲lrc', lrc);
        that.loadLrc(lrc);
        that.setData({
          music: res.data
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 300)
        if (fn) {
          fn()
        }
      },
      fail: function (res) {
        // fail
        console.log('请求歌曲失败', res)
        wx.hideLoading()
        wx.showToast({
          title: '歌曲请求失败',
          icon: 'error',
          duration: 2000
        })
      },
      complete: function (res) {
        // complete
      }
    })

  },
  loadLrc: function (link) {
    wx.request({
      url: link,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log('加载歌曲歌词', res)
        musicLrc = parseLyric(res.data)
        console.log('歌词格式化', musicLrc)
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  onPlay: function (event) {//点击音乐列表播放歌曲;
    var that = this;
    var id = event.currentTarget.dataset.id;
    var song_id = event.currentTarget.dataset.song_id;

    this.setData({
      playerId: id
    })

    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        if (networkType != 'wifi' && networkType != 'none' &&that.data.play3g) {
          wx.showModal({
            title: '温馨提示',
            content: '检测到您现在使用的并不是wifi，确认表示您默认使用流量进行体验，您可在页面’我‘中关闭流量听歌、视频功能，土豪请无视！',
            success: function (res) {
              console.log(res)
              if (res.confirm) {
                console.log('用户点击确定')
                wx.setStorageSync('playerId', id)  

                //不再提示流量信息
                this.setData({
                  play3g:false
                })
                wx.setStorageSync('play3g',false)
                       
                console.log(id)
                if (that.data.musicShow) {//播放时显示播放器;
                  that.showMusicPlay()
                  console.log(1)
                }
                if (song_id != that.data.music.songinfo.song_id) {
                  that.playmusic(song_id, function () {//延迟300ms播放;
                    setTimeout(function () {
                      that.audio.play();
                    }, 300)
                  });

                } else {
                  setTimeout(function () {
                    that.audio.play();
                  }, 300)
                }
              } else {
                console.log('用户点击取消')
                that.audio.pause();
              }
            }
          })
        }else {
          that.audio.play();
          that.setData({
            playerSrc: that.data.music.songinfo.pic_radio
          })
          that.rotatePlayer()
        }
      }
    })


  },
  onAudioPlay: function () {
    //歌曲播放时触发事件;
    var that = this;
    app.globalData.musicCount++;
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        if (networkType != 'wifi' && networkType != 'none' && that.data.play3g) {
          that.audio.pause();
          wx.showModal({
            title: '温馨提示',
            content: `检测到您现在使用的并不是wifi，确认表示您默认使用流量进行体验，您可在页面’我‘中关闭流量听歌、视频功能。\n土豪请无视！`,
            success: function (res) {
              console.log(res)
              if (res.confirm) {
                console.log('用户点击确定')
                that.audio.play();

                //不再提示流量信息                
                that.setData({
                  playerSrc: that.data.music.songinfo.pic_radio,
                  play3g:false
                })
                wx.setStorageSync('play3g',false)
                that.rotatePlayer()
              } else {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          that.setData({
            playerSrc: that.data.music.songinfo.pic_radio
          })
          that.rotatePlayer()
        }
      }
    })

  },
  onAudioEnd: function () {
    console.log('歌曲结束')
    var that = this;
    this.setData({
      playerId: ++this.data.playerId
    })
    var num = this.data.playerId;
    console.log(num)
    var song_id = this.data.song_list[num].song_id;
    console.log(song_id)
    this.playmusic(song_id, function () {//延迟300ms播放;
      setTimeout(function () {
        that.audio.play();
      }, 300)
    });
  },
  onAudioPause: function () {
    //歌曲暂停时触发事件;
    this.rotatePlayer('stop')
    console.log('歌曲暂停')
  },
  test: function () {
    this.audio.seek(3000)
  },
  onAudioChange: function (event) {
    //歌曲时间发生变化时触发;
    var playerTime = Math.floor(event.detail.currentTime);
    if (musicLrc[playerTime] && musicLrc[playerTime] != ' ' && musicLrc[playerTime] != '') {
      this.setData({
        playerLrc: musicLrc[playerTime]
      })
      // console.log(musicLrc[playerTime])
    }
  },
  onScroll: function () {
    if (!this.data.musicShow) {
      setTimeout(function () {//滚动时隐藏播放器;
        this.hiddenMusicPlay()
      }.bind(this), 300)
    }
  },
  onMusicEnd: function () {

  },
  musicPlaySwith: function () {//播放器显示开关
    if (this.data.musicShow) {
      this.showMusicPlay()
      console.log(1)
    } else if (this.data.musicShow == false) {
      this.hiddenMusicPlay()
      console.log(2)
    }
  },
  showMusicPlay: function () {//显示播放器动画
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
    console.log(animation)
    // animation.width(0).step()
    // this.setData({
    //   musicAnimation:animation.export()
    // })
    animation.width('90%').right('5%').step()
    this.setData({
      musicAnimation: animation.export()
    })
    this.setData({
      musicShow: false
    })
  },
  hiddenMusicPlay: function () {//隐藏播放器动画
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
    console.log(animation)
    // animation.width(0).step()
    // this.setData({
    //   musicAnimation:animation.export()
    // })
    setTimeout(function () {
      animation.width(0).step()
      this.setData({
        musicAnimation: animation.export()
      })
    }.bind(this), 300)
    this.setData({
      musicShow: true
    })
  },
  rotatePlayer: function (pause) {
    var rotatePic = wx.createAnimation({
      duration: 500000
    })
    if (pause == 'stop') {
      rotatePic.rotate(0).step()
      console.log('停止旋转')
    } else {
      rotatePic.rotate(36000).step()
      console.log('开始旋转')
    }
    this.setData({
      playerAnimation: rotatePic.export()
    })
  }
})
