import Vnode from './vnode.js';
import createElement from './createElement.js';
import patchVnode from './patchVnode.js';

export default function (oldVnode, newVnode) {
  // 判断传入的第一个参数是虚拟节点还是真实的dom节点 
  if (!oldVnode.sel) {
    // 传入的第一个参数是dom节点，要包装成虚拟节点
    oldVnode = Vnode(oldVnode.tagName.toLowerCase(), undefined, undefined, undefined, oldVnode);
  }
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    // 是同一个节点 精细化比较
    patchVnode(oldVnode, newVnode)
  } else {
    // 不是同一个节点，暴力删除旧的，插入新的
    let el = createElement(newVnode);
    // 插入到旧节点之前
    if (oldVnode.elm.parentNode && el) {
      oldVnode.elm.parentNode.insertBefore(el, oldVnode.elm);
    }
    // 删除旧节点
    oldVnode.elm.remove()
  }
}