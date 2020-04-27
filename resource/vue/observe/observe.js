import arrayProto, { observeArray } from "./array"

export function observe(data) {
  if (typeof data !== 'object' || data === null) {
    return
  }
  new Observer(data)
}

function defineReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('获取数据')
      return value
    },
    set(newVal) {
      console.log('设置数据')
      if (value === newVal) {
        return
      }
      observe(newVal)
      value = newVal
    }
  })
}

export default class Observer{
  constructor(data) {
    if (Array.isArray(data)) {
      data.__proto__ = arrayProto
      observeArray(data)
    } else {
      this.walk(data)
    }
  }
  walk(data) {
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i ++) {
      defineReactive(data, keys[i], data[keys[i]])
    }
  }
}