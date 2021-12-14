import h from "./diss/h.js";
import patch from './diss/patch.js'

let app = document.getElementById('app');
let btn = document.getElementsByTagName('button')[0];

let myVnode1 = h('ul', [
  h('li', {key: 'a'}, 'A'),
  h('li', {key: 'b'}, 'B'),
  h('li', {key: 'c'}, 'C'),
  h('li', {key: 'd'}, 'D'),
  h('li', {key: 'e'}, 'E'),
])
let myVnode2 = h('ul', {}, [
  h('li', {key: 'a'}, 'AAA'),
  h('li', {key: 'e', title: 'kkk'}, [
    h('a', {key: 'aa', href:'http://lishaokai.cn'}, 'lishaokai.cn')
  ]),
  h('li', {key: 'b'}, 'BB'),
  h('li', {key: 'f'}, 'F'),
])


btn.onclick = function() {
  patch(myVnode1, myVnode2)
}

patch(app, myVnode1)

