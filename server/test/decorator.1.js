function log(target, name, descriptor) {
    var oldValue = descriptor.value
    descriptor.value = function() {
      console.log(`Calling ${name} with`, arguments)
      return oldValue.apply(target, arguments)
    }
    return descriptor
  }

class Math {
  constructor(a = 2, b = 3) {
    this.add(a,b)
  }
  @log
  add(a, b) {
    return a + b
  }
}



const math = new Math()

// passed parameters should get logged now

console.log(math)
