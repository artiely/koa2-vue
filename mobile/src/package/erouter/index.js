let transition = {}
transition.install = (Vue, router, options = {}) => {
  let route,
    // lastPath,
    transitionType,
    op, // 配置项
    // coord = {x: 0, y: 0}, // 按下坐标
    // position = {x: 0, y: 0},
    lastComponent

  _initOptions()

  // 全局vueg配置
  Object.keys(options).forEach(key => {
    op[key] = options[key]
  })

  // 旧组件退出后会被销毁，所以建个容器，在销毁后重新挂在上去，作为“底色”
  // function setBackground() {
  //   let obj = this.$el.classList
  //   if (!obj) return

  //   let arr = []
  //   Object.keys(obj).forEach(item => {
  //     arr.push(obj[item])
  //   })
  //   let isInArr = false
  //   arr.map(item => {
  //     if (item === 'animated') isInArr = true
  //   })
  //   // 我想屎。。。
  //   if (!isInArr) {
  //     // 已经添加动画了不再添加
  //     return
  //   }

  //   let bacgrEle = document.createElement('div')
  //   bacgrEle.id = 'vueg-background'
  //   if (op.disable) return

  //   // 每次重新挂载vue都会清空被挂载元素，所有每次都要再添加进去
  //   let vuegBac = document.getElementById('vueg-background')
  //   // 不存在就插入
  //   if (!vuegBac) {
  //     document.body.appendChild(bacgrEle)
  //     vuegBac = bacgrEle
  //   }

  //   vuegBac.innerHTML = ''
  //   vuegBac.classList = []
  //   vuegBac.appendChild(this.$el)

  //   // 恢复之前的滚动条位置
  //   vuegBac.scrollLeft = position.x
  //   vuegBac.scrollTop = position.y
  // }
  Vue.directive('transition', {
    inserted(el, binding, vnode, oldVnode) {
      addEffect(vnode.componentInstance, el)
    }
  })
  Vue.mixin({
    beforeDestroy: ()=>{
      
    },
    deactivated: op.nuxt ? null : setBackground,
    beforeRouteEnter(to, from, next) {
      // 记录滚动条位置
      // position = {x: window.pageXOffset, y: window.pageYOffset}
      next()
    },
    beforeRouteLeave(ro, from, next) {
      lastComponent = this
      next()
    },
    
  })

  router.beforeEach((to, from, next) => {
    next()
  })

  // router.afterEach后获得新页面的组件，组件渲染或激活后触发addEffect
  function addEffect(ins = this, el) {
    if (!ins) {
      // 无参
      return
    }
    if (!route) return
    if (!el) return
    if (!el.parentElement) return

    // Fix: Error in mounted hook: "TypeError: Cannot set property 'animationDuration' of undefined"
    // 如果组件内使用了 beforeRouteEnter 钩子函数并且延迟执行了 next 函数，会导致第一次 el 为注释，所以判断一下 el 的类型必须为 Element
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
    if (el.nodeType !== 1) return

    // 防止某组件的配置影响其他组件，每次都初始化一下数据
    _initOptions()

    // 全局vueg配置
    Object.keys(options).forEach(key => {
      op[key] = options[key]
    })

  
    if (vuegConfig) {
      Object.keys(vuegConfig).forEach(key => {
        op[key] = vuegConfig[key]
      })
    }

}

export default transition
