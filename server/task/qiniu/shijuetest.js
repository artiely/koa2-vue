const data = require('../shijue.json')
data.map(async shijue => {
  // 匹配所有的img
  var imgArr = shijue.content.match(/<img.*?(?:>|\/>)/gi)
  console.log(imgArr)
  //匹配src属性
  var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i

  for (var i = 0; i < imgArr.length; i++) {
    var src = imgArr[i].match(srcReg)
    console.log('src', src)
    //获取图片地址
    if (src[1]) {
      console.log('已匹配的图片地址' + (i + 1) + '：' + src[1])
      var _src = src[1]
      // 上传到七牛
      var key = 123 + i

      // 全部替换
      shijue.content = shijue.content.replace(
        imgArr[i],
        `<img src="http://qiniu.08tj.com/${key}" />`
      )
    }
  }
  console.log(shijue.content)
})
