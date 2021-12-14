// 创建真正Dom节点，把虚拟dom vnode变成真实dom
export default function createElement(vnode) {
  // 创建一个空dom节点
  let domNode = document.createElement(vnode.sel);
  // 把这个dom节点复制到vnode的elm属性上
  if (vnode.data) {
    for (let attr in vnode.data) {
      if (attr != 'key') {
        domNode.setAttribute(attr, vnode.data[attr])
      }
    }
  }
  vnode.elm = domNode;
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    // 文本节点
    domNode.innerText = vnode.text;
  } else {
    // 有子节点，children有值的情况下
    // 递归遍历children
    for (let i=0; i<vnode.children.length; i++) {
      // children里面为h函数，为新的虚拟dom
      let ch = vnode.children[i];
      let newEl = createElement(ch);
      // 递归把新创建的添加到父元素上，也就是domNode，等同与vnode.elm
      domNode.appendChild(newEl);
    }
  }
  return vnode.elm
}