// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: "体验问题",
                isActive: true
            },
            {
                id: 1,
                value: "商品，商家投诉",
                isActive: false
            },
        ],
        chooseImage:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    //选择图片
    handleChooseImg(){
        wx.chooseImage({
            count:9,
            sizeType:['original','compressed'],
            sourceType:['album','camera'],
            success:(res)=> {
                // console.log(res)
                this.setData({
                    chooseImage:[...this.data.chooseImage,...res.tempFilePaths]
                })
            }
        })
    },
    handleRemoveImage(e){
        const {index}=e.currentTarget.dataset
        console.log(index)
        let {chooseImage}=this.data
        chooseImage.splice(index,1)
        this.setData({
            chooseImage
        })
    }
})