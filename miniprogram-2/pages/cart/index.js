// pages/cart/index.js
import {getSetting, openSetting, chooseAddress, showModel, showToast} from "../../utils/asyncWx"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
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
        const cart = wx.getStorageSync("cart") || []
        this.setCart(cart)
        // console.log(!address.username)
        this.setData({
            address
        })
    },
    //获取收货地址
    async handleChooseAddress() {
        // wx.getLocation()
        try {
            const res1 = await getSetting()
            const scopeAddress = res1.authSetting["scope.address"]
            if (scopeAddress === false) {
                await openSetting()
            }
            const address = await chooseAddress()
            // console.log(res2)
            // address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
            wx.setStorageSync("address", address)

        } catch (err) {
            console.log(err)
        }
    },
    //商品选中
    handleCheckChanged(e) {
        const {cart} = this.data
        const goods_id = e.currentTarget.dataset.id;
        let index = cart.findIndex(v => v.goods_id === goods_id);
        cart[index].checked = !cart[index].checked
        this.setCart(cart)
    },
    //商品全选改变
    handleAllChecked() {
        let {cart, allChecked} = this.data
        allChecked = !allChecked
        cart.forEach(v => v.checked = allChecked)
        this.setCart(cart)
    },
    //商品数量编辑
    async handleEdit(e) {
        const {operation, id} = e.currentTarget.dataset
        let {cart} = this.data
        const index = cart.findIndex(v => v.goods_id === id)
        if (cart[index].num === 1 && operation === -1) {
            const res = await showModel({content: '是否删除该商品？'})
            if (res.confirm) {
                cart.splice(index, 1)
                this.setCart(cart)
            }
        } else {
            cart[index].num += operation
            this.setCart(cart)
        }

    },
    //设置购物车状态 底部同时变
    setCart(cart) {
        //空数组调用every方法，返回值为true
        // const allChecked = cart.length ? cart.every(v => v.checked === true) : false
        // console.log(address)
        let totalPrice = 0
        let totalNum = 0
        let allChecked = true
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.goods_price * v.num
                totalNum += v.num
            } else {
                allChecked = false
            }
        })
        allChecked = cart.length != 0 ? allChecked : false
        this.setData({
            cart,
            totalPrice,
            totalNum,
            allChecked
        })
        wx.setStorageSync("cart", cart)
    },
    //结算
    async handlePay() {
        const {address,totalNum} = this.data
        if (!address.userName) {
            await showToast({title: "您还未选择收货地址"})
            return;
        }
        if (totalNum===0){
            await showToast({title:"您还未选择任何商品"})
            return;
        }
        wx.navigateTo({url: '/pages/pay/index'})
    }

})