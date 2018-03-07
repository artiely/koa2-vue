const puppeteer = require('puppeteer')
const url = 'http://www.ui.cn/'
void (async () => {
  console.log('开始了')
  const browser = await puppeteer.launch({
    timeout: 0,
  })
  console.log('等待页面打开')
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2',
  })
  await page.waitFor(1000)
  // 爬取第一页的链接
  let target = await page.evaluate(() => {
    var _tit = document.querySelectorAll('#project h4.title')
    var _poster = document.querySelectorAll(
      '#project .post-works img.imgloadinglater'
    )
    let title = []
    for (let i = 0; i < _tit.length; i++) {
      title.push(_tit[i].innerText)
    }
    let poster = []
    for (let i = 0; i < _poster.length; i++) {
      poster.push(_poster[i].getAttribute('data-original') || '')
    }
    let links = [...document.querySelectorAll('#project .pos>a')].toString()
    return {links, title, poster}
  })
  targetLink = target.links.split(',')
  console.log('长度', targetLink.length)
  // 测试只爬取两个详情
  // targetLink = targetLink.slice(0, 2)
  let picList = []
  for (let i = 0; i < targetLink.length; i++) {
    // 根据url获取每一页的id
    if (targetLink[i].indexOf('detail') !== -1) {
      var _id = targetLink[i].split('detail/')[1]
      _id = _id.split('.html')[0]
      console.log(`开始爬取第${i}页详情id为${_id}`)
      var content = ''
      try {
        await page.goto(targetLink[i])
        await page.waitFor(1000)
        content = await page.evaluate(() => {
          return document.querySelector('#p-content').innerHTML
        })
      } catch (e) {
        console.log('一般是超时了哟', e)
      }
      picList.push({
        id: _id,
        title: target.title[i],
        content: content || '(*^▽^*)',
        poster: target.poster[i],
      })
    }
  }
  console.log(targetLink)
  console.log(picList)
  browser.close()
  process.send(picList)
  process.exit(0)
})()
