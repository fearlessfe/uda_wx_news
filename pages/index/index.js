//index.js
//获取应用实例
const app = getApp()
const types = [
  {
    name: "国内",
    type: "gn"
  },
  {
    name: "国际",
    type: "gj"
  },
  {
    name: "财经",
    type: "cj"
  },
  {
    name: "娱乐",
    type: "yl"
  },
  {
    name: "军事",
    type: "js"
  },
  {
    name: "体育",
    type: "ty"
  },
  {
    name: "其他",
    type: "other"
  }
]
Page({
  data: {
    types,
    news: '',
    current: 'gn',
    hotNews: ''
  },
  //事件处理函数
  onLoad() {
    this.getNews(null)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNews(null,() => {
      wx.stopPullDownRefresh()
    })
  },
  getNews(event,cb) {
    let type
    if (event) type = event.currentTarget.dataset.type
    else type=this.data.types[0].type
    this.setData({
      current: type
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type
      },
      success: res => {
        let result = res.data.result
        result.forEach(item => {
          item.date = item.date.substring(11,16)
        })
        let [hotNews, ...news] = result;
        this.setData({
          news,
          hotNews
        })
      },
      complete: () => {
        cb && cb()
      }
    })
  },
  showDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  },
})
