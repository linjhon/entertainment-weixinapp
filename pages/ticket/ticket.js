// pages/ticket/ticket.js

var html2wxml = require('../../utils/html2wxml');
var app = getApp();
Page({
    data: {
        cinema: '',
        date: '',
        movieid: '',
        cinemaid: '',
        screenWidth:'',
        
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that=this;


        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    screenWidth: res.screenWidth
                })
            }
        })



        this.setData({
            movieid: options.movieid,
            cinemaid: options.cinemaid
        })
        var cinemaData = app.globalData.movieList[this.data.cinemaid + this.data.movieid]
        if (!cinemaData) {
            this.getTicketData();
            console.log('数据不存在，再次请求')
        } else {
            this.setData({
                cinema: cinemaData
            })
            console.log('数据已存在取出')
        }
    },
    onReady: function () {
        // 页面渲染完成
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
    dateTab: function (event) {
        // console.log(event)
        this.setData({
            currentDate: event.target.dataset.date
        })
    },
    ab: function () {
        return 123;
    },
    priceFormat: function (item) {

        for (var key in item) {
            // console.log('dateshow', key, item)
            for (var i = 0; i < item[key].length; i++) {

                item[key][i].oldprice = html2wxml.html2json(item[key][i].prStr)
                item[key][i].price = html2wxml.html2json(item[key][i].sellPrStr)
            }
        }
    },
    telPhone: function (event) {
        wx.makePhoneCall({
            phoneNumber: event.target.dataset.phone //
        })
    },
    selectMovie: function (event) {
        console.log(event)
        this.setData({
            movieid: event.target.dataset.movieid,            
        })
        var cinemaData = app.globalData.movieList[this.data.cinemaid + this.data.movieid]
        if (!cinemaData) {
            this.getTicketData();
            console.log('数据不存在，再次请求')
        } else {
            var date = cinemaData.Dates[0];
            this.setData({
                cinema: cinemaData,
                currentDate: date,
                picScrollLeft: event.target.dataset.index * Math.ceil(this.data.screenWidth * 0.264)
            })
            console.log('数据已存在取出')
        }
    },
    getTicketData: function () {
        var that = this;
        var movieid = this.data.movieid;
        var cinemaid = this.data.cinemaid;
        wx.showLoading({
            title: "加载中"
        })
        wx.request({
            url: 'https://m.maoyan.com/showtime/wrap.json',
            data: {
                cinemaid: cinemaid,
                movieid: movieid
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                // success
                if (!res.data) return;

                //   res.data = { "control": { "expires": 120 }, "status": 0, "data": { "Dates": [{ "slug": "2017-05-09", "text": "今天 5月09日" }, { "slug": "2017-05-10", "text": "明天 5月10日" }, { "slug": "2017-05-11", "text": "后天 5月11日" }, { "slug": "2017-05-12", "text": "周五 5月12日" }], "currentMovie": { "nm": "银河护卫队2", "img": "http://p0.meituan.net/165.220/movie/fbe5f97c016c9f4520109dc70f458d4d83363.jpg", "sc": 9.1, "preferential": 0, "ver": "2D/3D/IMAX 3D/中国巨幕", "isShowing": true, "id": 248683 }, "cinemaDetailModel": { "area": "江干区", "sellmin": 0, "sell": true, "nm": "SFC上影影城(龙湖IMAX店)", "ct": "杭州", "callboard": "", "brd": "SFC上影影城", "dis": "", "tel": ["0571-88173663"], "suw": "", "dri": "", "note": "", "dealtp": 0, "deals": "", "lat": 30.309969, "lng": 120.32624, "price": 0.0, "preferential": 0, "bus": "", "park": "凭本人当日电影票根至影城售票前台可领取免费停车2小时优惠券", "imax": 1, "snum": 36, "s": 7.0833335, "s1": 7.7222223, "s2": 7.7777777, "s3": 8.055555, "featureTags": [{ "desc": "限网上选座后取票", "type": 1, "tag": "取票机" }, { "desc": "2号厅，219个座位；3号厅，219个座位；4号厅，145个座位；5号厅，185个座位；6号厅，185个座位；7号VIP厅，44个座位；8号厅，156个座位；9号厅，156个座位", "type": 19, "tag": "60帧厅" }, { "desc": "1号IMAX厅，376个座位", "type": 3, "tag": "IMAX厅" }, { "desc": "1.3米以下（含1.3米）儿童2D、3D免票，每位家长限带一名免票儿童且该儿童无座位。（IMAX厅及VIP厅不享受）", "type": 7, "tag": "儿童优惠" }, { "desc": "凭本人当日电影票根至影城售票前台可领取免费停车2小时优惠券", "type": 5, "tag": "可停车" }], "addr": "江干区金沙大道560号金沙天街商业中心5楼", "id": 13669 }, "movies": [{ "nm": "银河护卫队2", "img": "http://p0.meituan.net/165.220/movie/fbe5f97c016c9f4520109dc70f458d4d83363.jpg", "sc": 9.1, "preferential": 0, "ver": "2D/3D/IMAX 3D/中国巨幕", "isShowing": true, "id": 248683 }, { "nm": "摔跤吧！爸爸", "img": "http://p0.meituan.net/165.220/movie/aeb864fa21d578d845b9cefc056e40cb2874891.jpg", "sc": 9.8, "preferential": 0, "ver": "2D", "isShowing": true, "id": 588362 }, { "nm": "麻烦家族", "img": "http://p1.meituan.net/165.220/movie/f6fbb50329dd25bc1331104a3d5aa209520988.png", "sc": 0.0, "preferential": 0, "ver": "2D", "isShowing": false, "id": 1197452 }, { "nm": "记忆大师", "img": "http://p1.meituan.net/165.220/movie/e92d824ca3d9e2dcb20622f72162d73d798396.jpg", "sc": 8.6, "preferential": 0, "ver": "2D/IMAX 2D/中国巨幕", "isShowing": true, "id": 345672 }, { "nm": "拆弹·专家", "img": "http://p1.meituan.net/165.220/movie/cc50791238502ae1fa08df764c5f5c97223987.jpg", "sc": 9.1, "preferential": 0, "ver": "2D/中国巨幕", "isShowing": true, "id": 346103 }, { "nm": "速度与激情8", "img": "http://p1.meituan.net/165.220/movie/af297f59e363ce96290dfea22f6fea0c153020.jpg", "sc": 9.4, "preferential": 0, "ver": "2D/3D/IMAX 3D/中国巨幕/全景声", "isShowing": true, "id": 248700 }, { "nm": "亚瑟王：斗兽争霸", "img": "http://p0.meituan.net/165.220/movie/48e48e7e9c74838950529fa0982e0817684444.png", "sc": 0.0, "preferential": 0, "ver": "3D/中国巨幕/全景声", "isShowing": false, "id": 338409 }, { "nm": "超凡战队", "img": "http://p1.meituan.net/165.220/movie/dcfb57950d6a904544bf9c7fcc2ed5d7194198.jpg", "sc": 0.0, "preferential": 0, "ver": "2D/3D/中国巨幕/全景声", "isShowing": false, "id": 338499 }, { "nm": "春娇救志明", "img": "http://p0.meituan.net/165.220/movie/ff46b5edfbd2f737219b9eed78e25fa2969775.jpg", "sc": 8.7, "preferential": 0, "ver": "2D", "isShowing": true, "id": 672114 }, { "nm": "喜欢·你", "img": "http://p1.meituan.net/165.220/movie/ea0131b3e9e40f226c7c2664f6185a3792752.jpg", "sc": 8.9, "preferential": 0, "ver": "2D", "isShowing": true, "id": 672175 }, { "nm": "毒。诫", "img": "http://p1.meituan.net/165.220/movie/e797634aa52b5a42654246cc6d1918d3462379.jpg", "sc": 0.0, "preferential": 0, "ver": "2D", "isShowing": false, "id": 1203251 }], "DateShow": { "2017-05-09": [{ "tm": "17:25", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "4号厅", "sellPrStr": "70440", "prStr": "64451", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-09", "dt": "2017-05-09", "end": "19:41", "showId": 156202, "preferential": 0 }, { "tm": "17:40", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "9号厅", "sellPrStr": "85449", "prStr": "94450", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-09", "dt": "2017-05-09", "end": "19:56", "showId": 156201, "preferential": 0 }, { "tm": "18:55", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "14445", "prStr": "73454", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-09", "dt": "2017-05-09", "end": "21:11", "showId": 11518, "preferential": 0 }, { "tm": "19:15", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "2号厅", "sellPrStr": "07447", "prStr": "65451", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-09", "dt": "2017-05-09", "end": "21:31", "showId": 11519, "preferential": 0 }, { "tm": "19:40", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "92642", "prStr": "896214041110", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-09", "dt": "2017-05-09", "end": "21:56", "showId": 11525, "preferential": 0 }, { "tm": "20:00", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "4号厅", "sellPrStr": "97447", "prStr": "56455", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-09", "dt": "2017-05-09", "end": "22:16", "showId": 156203, "preferential": 0 }, { "tm": "21:00", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "7号VIP厅", "sellPrStr": "53641", "prStr": "108012291300", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-09", "dt": "2017-05-09", "end": "23:16", "showId": 156204, "preferential": 0 }, { "tm": "21:30", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "87444", "prStr": "84454", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-09", "dt": "2017-05-09", "end": "23:46", "showId": 11524, "preferential": 0 }, { "tm": "21:50", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "2号厅", "sellPrStr": "91449", "prStr": "27451", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-09", "dt": "2017-05-09", "end": "00:06", "showId": 11515, "preferential": 0 }, { "tm": "22:15", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "71641", "prStr": "291314142430", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-09", "dt": "2017-05-09", "end": "00:31", "showId": 11514, "preferential": 0 }], "2017-05-10": [{ "tm": "10:20", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "9号厅", "sellPrStr": "97441", "prStr": "02455", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "12:36", "showId": 70839, "preferential": 0 }, { "tm": "11:10", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "62445", "prStr": "77451", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "13:26", "showId": 70826, "preferential": 0 }, { "tm": "11:30", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "2号厅", "sellPrStr": "12441", "prStr": "67450", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "13:46", "showId": 70827, "preferential": 0 }, { "tm": "11:55", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "30649", "prStr": "631614547050", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "14:11", "showId": 70822, "preferential": 0 }, { "tm": "12:15", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "4号厅", "sellPrStr": "83448", "prStr": "03459", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "14:31", "showId": 70823, "preferential": 0 }, { "tm": "12:55", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "9号厅", "sellPrStr": "98447", "prStr": "90450", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "15:11", "showId": 70824, "preferential": 0 }, { "tm": "13:15", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "7号VIP厅", "sellPrStr": "68641", "prStr": "270512339750", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "15:31", "showId": 70825, "preferential": 0 }, { "tm": "14:05", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "2号厅", "sellPrStr": "80449", "prStr": "32450", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "16:21", "showId": 70821, "preferential": 0 }, { "tm": "14:30", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "06648", "prStr": "521614417380", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "16:46", "showId": 70820, "preferential": 0 }, { "tm": "14:50", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "4号厅", "sellPrStr": "18442", "prStr": "53459", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "17:06", "showId": 70817, "preferential": 0 }, { "tm": "15:30", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "8号厅", "sellPrStr": "68445", "prStr": "33456", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "17:46", "showId": 70816, "preferential": 0 }, { "tm": "16:20", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "49440", "prStr": "80459", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "18:36", "showId": 70819, "preferential": 0 }, { "tm": "16:40", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "2号厅", "sellPrStr": "18443", "prStr": "09456", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "18:56", "showId": 70818, "preferential": 0 }, { "tm": "17:05", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "10646", "prStr": "746514271250", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "19:21", "showId": 70838, "preferential": 0 }, { "tm": "17:25", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "4号厅", "sellPrStr": "87449", "prStr": "67452", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "19:41", "showId": 70837, "preferential": 0 }, { "tm": "17:40", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "9号厅", "sellPrStr": "73445", "prStr": "02453", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "19:56", "showId": 70832, "preferential": 0 }, { "tm": "18:55", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "01448", "prStr": "21454", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "21:11", "showId": 70836, "preferential": 0 }, { "tm": "19:15", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "2号厅", "sellPrStr": "22441", "prStr": "81459", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "21:31", "showId": 70833, "preferential": 0 }, { "tm": "19:40", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "73646", "prStr": "036214697140", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "21:56", "showId": 70834, "preferential": 0 }, { "tm": "20:00", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "4号厅", "sellPrStr": "76441", "prStr": "68458", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "22:16", "showId": 70835, "preferential": 0 }, { "tm": "21:00", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "7号VIP厅", "sellPrStr": "56648", "prStr": "330912196420", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "23:16", "showId": 70828, "preferential": 0 }, { "tm": "21:30", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "31448", "prStr": "94451", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "23:46", "showId": 70831, "preferential": 0 }, { "tm": "21:50", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "2号厅", "sellPrStr": "55447", "prStr": "59458", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "00:06", "showId": 70830, "preferential": 0 }, { "tm": "22:15", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "39643", "prStr": "123214599470", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-10", "dt": "2017-05-10", "end": "00:31", "showId": 70829, "preferential": 0 }], "2017-05-11": [{ "tm": "10:55", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "23446", "prStr": "95459", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "13:11", "showId": 9736, "preferential": 0 }, { "tm": "11:35", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "9号厅", "sellPrStr": "66445", "prStr": "16453", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "13:51", "showId": 9735, "preferential": 0 }, { "tm": "11:55", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "94645", "prStr": "260814096170", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "14:11", "showId": 9737, "preferential": 0 }, { "tm": "12:50", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "4号厅", "sellPrStr": "64449", "prStr": "17905", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "15:06", "showId": 94437, "preferential": 0 }, { "tm": "13:30", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "42447", "prStr": "93906", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "15:46", "showId": 9738, "preferential": 0 }, { "tm": "14:00", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "7号VIP厅", "sellPrStr": "20640", "prStr": "653612547550", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "16:16", "showId": 94438, "preferential": 0 }, { "tm": "14:10", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "9号厅", "sellPrStr": "63449", "prStr": "14906", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "16:26", "showId": 9742, "preferential": 0 }, { "tm": "14:30", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "73641", "prStr": "100414775460", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "16:46", "showId": 9741, "preferential": 0 }, { "tm": "14:45", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "8号厅", "sellPrStr": "56443", "prStr": "22908", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "17:01", "showId": 9745, "preferential": 0 }, { "tm": "15:25", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "4号厅", "sellPrStr": "02440", "prStr": "63901", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "17:41", "showId": 94439, "preferential": 0 }, { "tm": "16:05", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "78441", "prStr": "05900", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "18:21", "showId": 9743, "preferential": 0 }, { "tm": "16:35", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "7号VIP厅", "sellPrStr": "99644", "prStr": "980712514170", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "18:51", "showId": 94440, "preferential": 0 }, { "tm": "17:05", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "08646", "prStr": "652214547960", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "19:21", "showId": 9740, "preferential": 0 }, { "tm": "18:40", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "06444", "prStr": "37909", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "20:56", "showId": 9746, "preferential": 0 }, { "tm": "19:40", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "14644", "prStr": "887714703650", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "21:56", "showId": 9744, "preferential": 0 }, { "tm": "20:15", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "4号厅", "sellPrStr": "39448", "prStr": "73907", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "22:31", "showId": 94441, "preferential": 0 }, { "tm": "21:15", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "3号厅", "sellPrStr": "63444", "prStr": "05902", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "23:31", "showId": 9749, "preferential": 0 }, { "tm": "21:45", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "7号VIP厅", "sellPrStr": "93647", "prStr": "907612481450", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "00:01", "showId": 94443, "preferential": 0 }, { "tm": "22:15", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "58644", "prStr": "821814974070", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "00:31", "showId": 9747, "preferential": 0 }, { "tm": "22:50", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "4号厅", "sellPrStr": "76440", "prStr": "28909", "tp": "3D", "lang": "英语", "embed": 0, "showDate": "2017-05-11", "dt": "2017-05-11", "end": "01:06", "showId": 94442, "preferential": 0 }], "2017-05-12": [{ "tm": "12:25", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "43648", "prStr": "372714851860", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-12", "dt": "2017-05-12", "end": "14:41", "showId": 75754, "preferential": 0 }, { "tm": "15:00", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "63642", "prStr": "661714187140", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-12", "dt": "2017-05-12", "end": "17:16", "showId": 75753, "preferential": 0 }, { "tm": "20:10", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "06647", "prStr": "336614118080", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-12", "dt": "2017-05-12", "end": "22:26", "showId": 75755, "preferential": 0 }, { "tm": "22:45", "sell": true, "grayDesc": "", "seatStatus": 1, "isMorrow": false, "th": "1号IMAX厅", "sellPrStr": "38641", "prStr": "648414768550", "tp": "IMAX3D", "lang": "英语", "embed": 0, "showDate": "2017-05-12", "dt": "2017-05-12", "end": "01:01", "showId": 75756, "preferential": 0 }] }, "cssLink": "//p0.meituan.net/movie/9ca4e6e45293ba96292f00ed964a24a22696.css" } }
                console.log(res.data.data);
                var data = res.data.data;
                var movieInx='';
                data.movies.forEach(function (item, inx){
                    if (item.id == data.currentMovie.id){
                        movieInx=inx
                    }
                })
                console.log(movieInx)
                var date = data.Dates[0];
                app.globalData.movieList[cinemaid + movieid] = data;//将请求的影院数据存入全局数据中;              
                console.log('全局变量',app.globalData.movieList)
                that.priceFormat(data.DateShow)
                that.setData({
                    cinema: data,
                    currentDate: date, //默认显示时间;
                    picScrollLeft: movieInx * Math.ceil(that.data.screenWidth * 0.264)
                })
                console.log('滑动距离',that.data.picScrollLeft)
                wx.hideLoading()
                // console.log('票', data.movies[0].img)
            },
            fail: function (res) {
                // fail
                wx.showToast({
                    title: '加载失败',
                    duration: 2000
                })
            },
            complete: function (res) {
                // complete        
                wx.hideLoading()
            }
        })
    }
})