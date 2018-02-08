const puppeteer = require('puppeteer')
const fs = require('fs')
void (async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto('https://juejin.im/user/599f7fccf265da24734437d9/likes', {
    waitUntil: 'networkidle2',
  })
  // await page.addScriptTag({
  //   url: 'https://cdn.bootcss.com/bluebird/3.5.1/bluebird.min.js',
  // })

  await page.waitFor(1000)
  for (let i = 0; i < 100; i++) {
    await page.waitFor(100)
    await page.keyboard.press('PageDown')
  }

  await page.waitFor(11000)

  page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`)
  })
  let targetLink = await page.evaluate(() => {
    return [...document.querySelectorAll('a.title')]
      .filter(item => {
        return item.innerText && item.innerText
      })
      .toString()
  })

  targetLink = targetLink.split(',')
  console.log(targetLink.length)
  // targetLink = targetLink.slice(0, 2)
  let articleList = []
  for (let i = 0; i < targetLink.length; i++) {
    await page.goto(targetLink[i])
    await page.waitFor(1000)
    let article = await page.evaluate(() => {
      if (!document.querySelector('.avatar') || !document.querySelector('.author-name')) {
        return
      }
      let avatar = document.querySelector('.avatar').getAttribute('data-src')
      let author = document.querySelector('.author-name').innerHTML
      let create_time = document.querySelector('.author-meta').innerText
      let title = document.querySelector('.post-title').innerHTML
      let content = document.querySelector('.post-content-container').innerHTML
      let tagsDom = document.querySelectorAll('a.tag-link')
      var tags = []
      for (let i = 0; i < tagsDom.length; i++) {
        tags.push(tagsDom[i].innerHTML)
      }
      return {title, avatar, author, create_time, tags, content}
    })
    articleList.push(article)
  }
  var ws = fs.createWriteStream(__dirname + '/juejin-like.json')
  ws.write(JSON.stringify(articleList))
  ws.on('end', function() {
    console.log('文件写入完成')
  })
  // browser.close()
})()
