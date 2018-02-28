const puppeteer = require('puppeteer')

const url = `https://movie.douban.com/tag/%E7%A7%91%E5%B9%BB?start=20&type=R`

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })
;(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
    headless:false
  })

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2',
  })

  await sleep(3000)

  await page.waitForSelector('.more')

  for (let i = 0; i < 4; i++) {
    await sleep(5000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.item')
    var links = []

    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let doubanId = it
          .find('.nbg')
          .attr('href')
          .split('subject/')[1]
          .split('/')[0]
        let title = $(it.find('.pl2 a')[0])
          .text()
          .replace(/\n/g, '')
          .replace(/\r/g, '')
          .replace(/\//g, '')
          .trim()
        let poster = it
          .find('img')
          .attr('src')
          .replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          poster,
        })
      })
    }

    return links
  })

  browser.close()
  console.log('爬取结束-------------')

  process.send({result})
  process.exit(0)
})()
