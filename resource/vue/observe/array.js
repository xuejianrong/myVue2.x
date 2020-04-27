import { observe } from "./observe"

const arrayProto = Object.create(Array.prototype)

let methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice']

methods.forEach(method => {
  arrayProto[method] = function(...args) {
    console.log('调用了' + method)
    let inserted = ''
    switch (method) {
      case 'splice': 
        inserted = args.slice(2)
        break
      case 'push':
      case 'unshift':
        inserted = args
        break
    }
    if (inserted) {
      observeArray(inserted)
    }
    return [][method].apply(this, args)
  }
})

export function observeArray(inserted) {
  inserted.forEach(data => {
    observe(data)
  })
}

export default arrayProto