// 爬取漂亮小姐姐的图片
const puppeteer = require('puppeteer')
const url = `http://www.meizitu.com/a/more_1.html`
// 开启一个子进程
void (async () => {
  console.log('开始了')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
    headless: true,
  })
  console.log('等待页面打开')
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2',
  })
  await page.waitFor(1000)
  // 爬取第一页的链接
  let target = await page.evaluate(() => {
    var _tit = document.querySelectorAll('.tit b')
    var _poster= document.querySelectorAll('.pic img')
    let title =[]
    for(let i=0;i<_tit.length;i++){
      title.push(_tit[i].innerHTML||'未知')
    }
    let poster=[]
    for (let i = 0; i < _poster.length; i++) {
      poster.push(_poster[i].getAttribute('src') || '')
    }
    let links = [...document.querySelectorAll('.pic a')].toString()
    return {links, title, poster}
  })
  targetLink = target.links.split(',')
  // 测试只爬取两个详情
  // targetLink = targetLink.slice(0, 2)
  let picList = []
  for (let i = 0; i < targetLink.length; i++) {
    // 根据url获取每一页的id
    let groupId = targetLink[i].replace(/[^0-9]/gi, '')
    console.log(`开始爬取第${i}页详情`)
    await page.goto(targetLink[i])
    await page.waitFor(1000)
    let links = await page.evaluate(() => {
      let dom = document.querySelectorAll('#picture img')
      let imgsrcarr = []
      for (let i = 0; i < dom.length; i++) {
        imgsrcarr.push(dom[i].getAttribute('src'))
      }
      return imgsrcarr
    })
    picList.push({
      groupId: groupId,
      title: target.title[i],
      links: links,
      poster: target.poster[i],
    })
  }
  console.log(targetLink)
  console.log(picList)
  browser.close()
  process.send(picList)
  process.exit(0)
})()
