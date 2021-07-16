export const getSetting=function(){
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
export const chooseAddress=function(){
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
export const openSetting=function(){
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

export const showModel=({content})=>{
    return new Promise((resolve ,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            success: (res)=> {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
export const showToast=({title})=>{
    return new Promise((resolve ,reject)=>{
        wx.showToast({
            title: title,
            icon:'none',
            success: (res)=> {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}