import {getSetting, openSetting, chooseAddress, showModel, showToast} from "../../utils/asyncWx"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    onShow() {
        //获取缓存地址
        const address = wx.getStorageSync("address")
        let cart = wx.getStorageSync("cart") || []
        // this.setCart(cart)
        // console.log(!address.username)
        cart = cart.filter(v => v.checked)
        this.setData({
            address
        })
        let totalPrice = 0
        let totalNum = 0
        let allChecked = true
        cart.forEach(v => {
            totalPrice += v.goods_price * v.num
            totalNum += v.num
        })
        allChecked = cart.length != 0 ? allChecked : false
        this.setData({
            cart,
            totalPrice,
            totalNum,
            address
        })

    },


    //设置购物车状态 底部同时变
    // setCart(cart) {
    //   //空数组调用every方法，返回值为true
    //   // const allChecked = cart.length ? cart.every(v => v.checked === true) : false
    //   // console.log(address)
    //   let totalPrice = 0
    //   let totalNum = 0
    //   let allChecked = true
    //   cart.forEach(v => {
    //     if (v.checked) {
    //       totalPrice += v.goods_price * v.num
    //       totalNum += v.num
    //     } else {
    //       allChecked = false
    //     }
    //   })
    //   allChecked = cart.length != 0 ? allChecked : false
    //   this.setData({
    //     cart,
    //     totalPrice,
    //     totalNum,
    //     allChecked
    //   })
    //   wx.setStorageSync("cart", cart)
    // },
    //结算
    async handlePay() {
        const {address, totalNum} = this.data
        if (!address.userName) {
            await showToast({title: "您还未选择收货地址"})
            return;
        }
        if (totalNum === 0) {
            await showToast({title: "您还未选择任何商品"})
            return;
        }
        wx.navigateTo({url: '/pages/pay/index'})
    }

})