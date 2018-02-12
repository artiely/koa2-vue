var proxyList = {
  '/api': {
    target: 'thhp://localhost:3001',
    changeOrigin: true
  }
}

console.log('设置代理中...', proxyList)
module.exports = {
  proxyList
}
