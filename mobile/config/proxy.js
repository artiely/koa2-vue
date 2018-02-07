var proxyList = {
  '/api': {
    target: 'http://172.16.7.248:8077',
    changeOrigin: true
  }
}

console.log('设置代理中...', proxyList)
module.exports = {
  proxyList
}
