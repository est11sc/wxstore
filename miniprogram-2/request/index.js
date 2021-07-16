//同时发送异步请求的次数
let ajaxTime=0
export const request = (params) => {
    ajaxTime++
    //页面加载中
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    //定义公共url
    const baseurl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseurl + params.url,
            success: (res) => {
                resolve(res.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete(res) {
                ajaxTime--
                if (ajaxTime===0){
                    wx.hideLoading()
                }
            }
        })
    })
}