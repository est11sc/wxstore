// pages/goods_list/index.js
import {request} from "../../request/index.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            }
        ],
        goodsList: []
    },
    QueryParams: {
        query: '',
        cid: '',
        pagenum: '1',
        pageSize: '10'
    },
    totalPages: 1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid = options.cid || ''
        this.QueryParams.query = options.query || ''
        this.getGoodsList()
    },
    //获取列表
    async getGoodsList() {
        const res = await request({url: '/goods/search', data: this.QueryParams})
        //获取总条数
        const total = res.total
        this.totalPages = Math.ceil(total / this.QueryParams.pageSize)
        // console.log(res)
        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        })
        //停止刷新
        wx.stopPullDownRefresh()
    },
    //标题点击事件
    handleTabsItemChange(e) {
        // console.log(e)
        //获取点击事件的索引
        const {index} = e.detail
        let {tabs} = this.data
        //修改原数组
        tabs.forEach((v, i) => {
            i === index ? v.isActive = true : v.isActive = false
        })
        this.setData({
            tabs
        })
    },
    //页面上滑触底
    onReachBottom() {
        if (this.QueryParams.pagenum >= this.totalPages) {
            // console.log('没有下一页了')
            wx.showToast({
                title: '没有下一页了'
            })
        } else {
            this.QueryParams.pagenum++
            this.getGoodsList()

        }
    },
    //下拉刷新事件
    onPullDownRefresh() {
        this.setData({
            goodsList: []
        })
        this.QueryParams.pagenum = 1
        this.getGoodsList()
    }


})