import Vue from 'vue'

const vm = new Vue({
  el: '#app',
  data: {
    str: 'Jrrr',
    obj: { name: 'a', age: 10 },
    arr: [{ b: 2 }, 2, 3]
  },
  watch: {},
  computed: {}
})

// console.log(vm.str = '222')
// vm.arr.push({ a: 1 })
// console.log(vm.arr)
vm.str = { c: 3 }
console.log(vm)