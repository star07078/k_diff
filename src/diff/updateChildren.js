import patchVnode from "./patchVnode.js";
import createElement from "./createElement.js";

function checkSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key;
}


// 精细化比较两个children的不同
// 参数： 父节点  老虚拟节点的children  新虚拟节点的children

// 比较方法
// 旧前 = 新前
// 旧后 = 新后
// 旧前 = 新后
// 旧后 = 新前

export default function (parentElm, oldCh, newCh) {
  let newStartIdx = 0;  // 新前
  let oldStartIdx = 0;  // 旧前
  let newEndIdx = newCh.length - 1; // 新后
  let oldEndIdx = oldCh.length - 1; // 旧后
  let newStartVnode = newCh[0]; // 新前节点
  let oldStartVnode = oldCh[0]; // 旧前节点
  let newEndVnode = newCh[newEndIdx]; // 新后节点
  let oldEndVnode = oldCh[oldEndIdx]; // 旧后节点
  let keyMap = null;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null || oldStartVnode == undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode == null || oldEndVnode == undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null || newStartVnode == undefined) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null || newEndVnode == undefined) {
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 旧前对比新前
      // 命中的话则需要把旧前和新前 向后前进一个
      // console.log('1命中');
      patchVnode(oldStartVnode, newStartVnode);
      newStartVnode = newCh[++newStartIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 旧后对比新后
      // 中的话则需要把旧后和新后 向前前进一个
      // console.log('2 命中');
      patchVnode(oldEndVnode, newEndVnode);
      newEndVnode = newCh[--newEndIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后对比旧前
      // 命中的话，则需要新后向前进一个，旧前向后进一个，并且移动旧前节点到旧后节点的后面 
      // console.log('3 命中');
      patchVnode(oldStartVnode, newEndVnode);
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      newEndVnode = newCh[--newEndIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 旧后对比新前
      // 命中的话，则需要旧后向前进一个，新前向后进一个，并且移动旧后节点到旧前节点的前面 
      // console.log('4 命中');
      patchVnode(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      newStartVnode = newCh[++newStartIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } else {
      // 如果都没有命中的话则需要循环来查找
      if (!keyMap) {
        // 利用对象key值的唯一性，把没有命中的旧的vnode的key值存储成key，下标存成value值
        keyMap = {};
        for (let i=oldStartIdx; i<=oldEndIdx; i++) {
          if (oldCh[i].key) {
            keyMap[oldCh[i].key] = i;
          }
        }
      }
      // 在keyMap里面寻找和新前相同的key值
      // 找不到则直接创建，并插入在旧的前面
      // 找到了，则把这项移动到旧前的前面，并把在oldCh被找到的这样设置成undefined
      // 然后新前向后进一个继续下一个循环
      let idxInOld = keyMap[newStartVnode.key];
      if (idxInOld == undefined) {
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm )
      } else {
        let elmToMove = oldCh[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        oldCh[idxInOld] = undefined;
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      newStartVnode = newCh[++newStartIdx];
    } 
  }
  if (newStartIdx <= newEndIdx) {
    // newCh还有节点没有遍历，需要添加
    for (let i=newStartIdx; i<=newEndIdx; i++) {
      // insertBefore第二个参数如果是null，则会自动向末尾添加
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // oldCh还有节点没有遍历，需要删除
    for (let i=oldStartIdx; i<=oldEndIdx; i++) {
      oldCh[i] && oldCh[i].elm.remove()
    }
  }
}