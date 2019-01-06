// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: "",
    defaultImage: 'http://via.placeholder.com/200x100'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getDetail()
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
  },
  getDetail() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {

        let result = res.data.result
        result.date = result.date.substring(11,16)
        this.setData({
          detail: result
        })
        console.log(result)
      },
      fail: error => {
        console.error(error)
      }
    })
  }
})