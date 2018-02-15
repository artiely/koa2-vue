class Math {
  @log
  add(a, b) {
    return a + b
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value

  descriptor.value = function () {
    arguments[0] = 100
    console.log(`Calling ${name} with`, arguments)
    // 我们可以对参数进行修改 
    
    return oldValue.apply(target, arguments)
  }

  return descriptor
}

const math = new Math()

// passed parameters should get logged now

console.log(math.add(2, 4))
