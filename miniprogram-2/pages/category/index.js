// pages/category/index.js
import {request} from "../../request/index.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //左侧菜单数组
        leftMenuList: [],
        //右侧
        rightContent: [],
        //被点击的左侧菜单
        currentIndex: 0,
        scrollTop: 0
    },
    //接口返回数据
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取本地数组
        const Cates = wx.getStorageSync("cates")
        if (!Cates) {
            this.getCates()
        } else {
            if (Date.now() - Cates.time > 1000 * 10) {
                this.getCates()
            } else {
                this.Cates = Cates.data
                let leftMenuList = this.Cates.map(v => v.cat_name);
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
    },
    async getCates() {
        const res = await request({url: "/categories"})
        this.Cates = res
        //存入本地数组
        wx.setStorageSync("cates", {time: Date.now(), data: this.Cates})
        //拆分数组
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
            leftMenuList,
            rightContent
        })
        // request({
        //     url: "/categories"
        // })
        //     .then(res => {
        //         this.Cates = res.data.message
        //         //存入本地数组
        //         wx.setStorageSync("cates", {time: Date.now(), data: this.Cates})
        //         //拆分数组
        //         let leftMenuList = this.Cates.map(v => v.cat_name);
        //         let rightContent = this.Cates[0].children;
        //         this.setData({
        //             leftMenuList,
        //             rightContent
        //         })
        //     })
    },
    //左侧菜单点击事件
    handleItemTap(e) {
        let {index} = e.currentTarget.dataset
        let rightContent = this.Cates[index].children;
        this.setData({
            currentIndex: index,
            rightContent,
            scrollTop: 0
        })
        // console.log(index)
    }


})