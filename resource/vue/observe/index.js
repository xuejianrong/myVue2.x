import { observe } from './observe'

export function initState(vm) {
  const options = vm.$options
  options.data && initData(vm)
  options.computed && initComputed(vm)
  options.watch && initWatch(vm)
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(val) {
      vm[source][key] = val
    }
  })
}

function initData (vm) {
  let data = vm._data = vm.$options.data
  for(let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data)
}
function initComputed () {}
function initWatch () {}