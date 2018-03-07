const puppeteer = require('puppeteer')

// 开启一个子进程
console.log('进入子进程')
  console.log('开始爬取')
  void (async () => {
    const browser = await puppeteer.launch({
    })
    console.log('打开页面')
    const page = await browser.newPage()
    await page.goto('https://juejin.im/user/599f7fccf265da24734437d9/likes', {
      waitUntil: 'networkidle2',
    })
    // await page.addScriptTag({
    //   url: 'https://cdn.bootcss.com/bluebird/3.5.1/bluebird.min.js',
    // })

    await page.waitFor(1000)
    console.log('滚动ing')
    for (let i = 0; i < 100; i++) {
      await page.waitFor(100)
      await page.keyboard.press('PageDown')
    }

    await page.waitFor(11000)

    page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i)
        {console.log(`${i}: ${msg.args()[i]}`)}
    })
    let targetLink = await page.evaluate(() => {
      return [...document.querySelectorAll('a.title')]
        .filter(item => {
          return item.innerText && item.innerText
        })
        .toString()
    })

    targetLink = targetLink.split(',')
    console.log(`文章的总长度${targetLink.length}`)
    let articleList = []
    for (let i = 0; i < targetLink.length; i++) {
       console.log(`开始爬取第${i}篇文章...`)
       // id 是判断文章是否重复的
        var articleId = targetLink[i].split('post/')[1]
        console.log('文章id是', articleId)
      await page.goto(targetLink[i])
      await page.waitFor(1000)
      let article = await page.evaluate((articleId) => {
        if (!document.querySelector('.avatar') || !document.querySelector('.author-name') || !articleId) {
          return
        }
        var id = articleId
        let avatar = document.querySelector('.avatar').getAttribute('data-src')
        let author = document.querySelector('.author-name').innerHTML
        let create_time = document.querySelector('.author-meta').innerText
        let title = document.querySelector('.post-title').innerHTML
        let content = document.querySelector('.post-content-container')
          .innerHTML
        let tagsDom = document.querySelectorAll('a.tag-link')
        var tags = []
        for (let j = 0; j < tagsDom.length; j++) {
          tags.push(tagsDom[j].innerHTML)
        }
        return {id,title, avatar, author, create_time, tags, content}
      },articleId)
      articleList.push(article)
    }
    browser.close()
    process.send(articleList)
    process.exit(0)
  })()
