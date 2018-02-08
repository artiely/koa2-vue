const cp = require('child_process')

void (async () => {
  const script = __dirname + '../crawler/meizi.js'
  const child = cp.fork(script, [])

  child.on('message', data => {
    let res = data
    // 拿到结果 入库操作 然后转七牛空间
  })
})()
