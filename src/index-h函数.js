import h from "./diff/h.js";

let myVNode = h('div', {}, [
  h('div', h('div', [h('ul', [h('li','123')])])),
  h('div', {}, '2222'),
  h('div', {}, '3333')
]);

console.log(myVNode);