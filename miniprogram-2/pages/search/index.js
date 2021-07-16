// pages/search/index.js
import {request} from '../../request/index'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFocus:false,
        inputValue:''
    },
    //防抖（定时器）
    TimeId: -1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //输入处理
    handleInput(e) {
        // console.log(e)
        const {value} = e.detail
        if (!value.trim()) {
            this.setData({
                goods:[],
                isFocus:false
            })
            return
        }
        this.setData({
            isFocus:true
        })
        clearTimeout(this.TimeId)
        this.TimeId=setTimeout(()=>{
            this.qsearch(value)
        },1000)
    },
    //请求
    async qsearch(query) {
        const res = await request({
            url: "/goods/qsearch", data: {query}
        })
        this.setData({
            goods: res
        })
    },
    handCancel(){
        this.setData({
            inputValue:'',
            isFocus:false,
            goods:[]
        })
    }

})