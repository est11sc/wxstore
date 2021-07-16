import {request} from "../../request/index.js"

Page({
    data: {
        //轮播图数组
        swiperList: [],
        //导航数组
        catesList: [],
        //楼层数组
        floorList: []
    },
    //页面加载出发
    onLoad: function (options) {
        // wx.request({
        //     url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     method:'get',
        //     dataType:'json',
        //     success:(res) =>{
        //         console.log(res)
        //         this.setData({
        //             swiperList:res.data.message
        //         })
        //     },
        // })
        this.getSwiperList()
        this.getCatesList()
        this.getFloorList()

    },
    getSwiperList() {
        request({url: "/home/swiperdata"})
            .then(result => {
                this.setData({
                    swiperList: result
                })
            })
    },
    getCatesList() {
        request({url: "/home/catitems"})
            .then(result => {
                this.setData({
                    catesList: result
                })
            })
    },
    getFloorList() {
        request({url: "/home/floordata"})
            .then(result => {
                // for(let i=0;i<=result.length;i++){
                //     for (let j=0;j<result[i].product_list.length;j++){
                //         result[i].product_list[j].navigator_url.replace('?','/index?')
                //     }
                // }
                console.log(result[0].product_list[0].navigator_url.replace('?','/index?'))
                this.setData({
                    floorList: result
                })
            })
    }
});