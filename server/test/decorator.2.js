// function log(num) {
  // return 
  function log(target, name, descriptor) {
    var oldValue = descriptor.value
    // let _num = num || 0
    descriptor.value = (...arg) => {
      // arg[0] += _num
      console.log(`Calling${target}, ${name} with`, arg)
      return oldValue.apply(target, arg)
    }
    return descriptor
  }
// }

class Math {
  // constructor(a = 3, b = 4) {
  //   this.add(a, b)
  // }
  @log
  add(a, b) {
    return a + b
  }
}

const math = new Math()

console.log(math)
console.log(math.add(9,1))
