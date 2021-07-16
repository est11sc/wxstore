// pages/goods_detail/index.js
import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  //商品对象
  goodsInfo: [],


  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //     const {goods_id} = options
  //     this.getGoodsDetail(goods_id)
  // },

  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options
    const {goods_id} = options
    this.getGoodsDetail(goods_id)


  },
// /goods/detail
  //获取商品详情
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({url: "/goods/detail", data: {goods_id}})
    this.goodsInfo = goodsObj
    let collect = wx.getStorageSync("collect") || []
    let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id)
    console.log(isCollect)
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // ios不识别webp格式
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,

      },isCollect
    })
  },
  //点击图片，预览大图
  handlePreviewImage(e) {
    const urls = this.goodsInfo.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls// 需要预览的图片http链接列表
    })
  },

  //加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || []
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
    if (index === -1) {
      //不存在
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
    } else {
      //存在
      cart[index].num++
    }
    wx.setStorageSync("cart", cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      //节流
      mask: true,
      success(res) {

      },
      fail(res) {

      },
      complete(res) {

      }

    })
  },
  handleCollect() {
    let isCollect = false
    let collect = wx.getStorageSync("collect") || []
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
    if (index !== -1) {
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    } else {
      collect.push(this.goodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync("collect", collect)
    this.setData({
      isCollect
    })
  }
})