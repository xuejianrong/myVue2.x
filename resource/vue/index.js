import { initState } from './observe'
import Watcher from './observe/watcher'

function Vue(options) {
  this._init(options)
}

Vue.prototype._init = function(options) {
  let vm = this
  vm.$options = options
  initState(vm)
  if (vm.$options.el) {
    vm.$mount()
  }
}

function query(el) {
  if (typeof el === 'string') {
    return document.querySelector(el)
  }
  return el
}
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g
let utils = {
  compilerText(node, vm) {
    node.textContent = node.textContent.replace(defaultRE, function(...args) {
      console.log(args)
      return utils.getValue(vm, args[1].trim())
    })
  },
  getValue(vm, expr) {
    let keys = expr.split('.')
    return keys.reduce((prev, next) => {
      return prev[next]
    }, vm)
  }
}

function compiler(node, vm) {
  let childNodes = [...node.childNodes]
  childNodes.forEach(child => {
    // child.nodeType 1是元素  3是文本
    if (child.nodeType === 1) {
      compiler(child, vm)
    } else if (child.nodeType === 3) {
      utils.compilerText(child, vm)
    }
  })
}

Vue.prototype.$mount = function() {
  let vm = this
  let el= vm.$options.el
  el = vm.$el = query(vm.$options.el)

  let updateComponent = function () {
    vm._update() // 更新组件
  }
  new Watcher(vm, updateComponent)
}

Vue.prototype._update = function() {
  let vm = this
  let el = vm.$el
  let node = document.createDocumentFragment()
  let firstChild = ''
  while (firstChild = el.firstChild) {
    node.appendChild(firstChild)
  }
  compiler(node, vm)
  el.appendChild(node)
}

export default Vue
