import vNode from './vnode.js';

// h('div', text)
// h('div', [])
// h('div', h())
// h('div', {}, text)
// h('div', {}, [])
// h('div', {}, h())

export default function (sel, b, c) {
  if (arguments.length == 2) {
    if (typeof b == 'string' || typeof c == 'number') {
      // h('div', text)
      return vNode(sel, undefined, undefined, b, undefined);
    } else if (Array.isArray(b)) {
      // h('div', [])
      let children = [];
      for (let i=0; i<b.length; i++) {
        if (!(typeof b[i] == 'object' && b[i].hasOwnProperty('sel'))) {
          throw new Error('数组参数必须保证所有项为h函数');
        }
        children.push(b[i])
      }
      return vNode(sel, undefined, children, undefined , undefined);
    } else if (typeof b == 'object' && b.hasOwnProperty('sel')) {
      // h('div', h('span', {}, 'text'))
      let children = [b];
      return vNode(sel, undefined, children, undefined , undefined);
    } else {
      throw new Error('传入的参数错误')
    }
  }
  if (arguments.length == 3) {
    if (typeof b != 'object') {
      throw new Error('传入的参数错误')
    }
    if (typeof c == 'string' || typeof c == 'number') {
      // h('div', {props:{title:"title"}}, "我是div")
      return vNode(sel, b, undefined, c, undefined);
    } else if(Array.isArray(c)) {
      // h('div', {props:{title:"title"}}, [h()])
      let children = [];
      for (let i=0; i<c.length; i++) {
        if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
          throw new Error('数组参数必须保证所有项为h函数');
        }
        children.push(c[i])
      }
      return vNode(sel, b, children, undefined , undefined);
    } else if (typeof c == 'object' || c.hasOwnProperty('sel')) {
      // h('div', {props: {title: 'title'}, h()})
      // h函数肯定且必须有sel函数
      // 不用执行，在测试中已经执行过了
      let children = [c];
      return vNode(sel, b, children, undefined , undefined);
    } else {
      throw new Error('传入的参数错误')
    }
  }
}