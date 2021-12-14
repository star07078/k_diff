import createElement from './createElement.js';
import updateChildren from './updateChildren.js';

export default function (oldVnode, newVnode) {
  // 判断新的虚拟节点和旧的虚拟节点是不是同一个对象
  if (oldVnode !== newVnode) {
    // 新的虚拟节点是否有 text文本 属性
    // text文本 属性 和 children子节点，必定存在一个
    if (newVnode.text != undefined && newVnode.children == undefined || !newVnode.children.length) {
      // newVode的文本属性和oldVode的文本属性不相等则进行替换
      if (oldVnode.text != newVnode.text) {
        oldVnode.elm.innerText = newVnode.text;
      }
    } else {
      // 旧的虚拟dom是否存在children（子节点）
      if (oldVnode.children && oldVnode.children.length) {
        // 最复杂的情况，新老虚拟节点都有children
        updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
      } else {
        // 1.把oldVnode的text清空
        // 2.把newVnode的children添加到DOM中
        oldVnode.elm.innerText = '';
        let children = newVnode.children;
        for (let i=0; i<children.length; i++) {
          oldVnode.elm.appendChild(createElement(children[i]))
        }
      }
    }
  }
}